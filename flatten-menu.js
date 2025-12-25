// Example of flattening nested menu items
const menuItems = [
  // 1. Dashboard - Level 1 Independent
  {
    label: "Dashboard",
    route: "dashboard",
    icon: "🏠",
    badge: 3,
  },

  {
    label: "Products",
    icon: "📦",
    badge: 15,
    children: [
      {
        label: "All Products",
        route: "products.index",
        badge: 10,
      },
      {
        label: "Add Product",
        route: "products.create",
        badge: 1,
      },
      {
        label: "Catalog",
        badge: 4,
        children: [
          {
            label: "Categories",
            route: "products.categories",
            badge: 2,
          },
          {
            label: "Inventory",
            route: "products.inventory",
            badge: 2,
          },
        ],
      },
    ],
  },

  // 8-11. Orders Section - Level 1 with Level 2 children
  {
    label: "Orders",
    icon: "🛒",
    badge: 28,
    children: [
      {
        label: "All Orders",
        route: "orders.index",
        badge: 28,
      },
      {
        label: "Pending",
        route: "orders.pending",
        badge: 12,
      },
      {
        label: "Completed",
        route: "orders.completed",
        badge: 16,
      },
    ],
  },

  // 12-14. Customers Section - Level 1 with Level 2 children
  {
    label: "Customers",
    icon: "👥",
    badge: 8,
    children: [
      {
        label: "All Customers",
        route: "customers.index",
        badge: 5,
      },
      {
        label: "Customer Groups",
        route: "customers.groups",
        badge: 3,
      },
    ],
  },

  // 15-17. Reports Section - Level 1 with Level 2 children
  {
    label: "Reports",
    icon: "📊",
    children: [
      {
        label: "Sales Report",
        route: "reports.sales",
      },
      {
        label: "Analytics",
        route: "reports.analytics",
        badge: 2,
      },
    ],
  },

  // 18-20. Marketing Section - Level 1 with Level 2 children
  {
    label: "Marketing",
    icon: "📢",
    badge: 4,
    children: [
      {
        label: "Email Campaigns",
        route: "marketing.campaigns",
        badge: 2,
      },
      {
        label: "Promotions",
        route: "marketing.promotions",
        badge: 2,
      },
    ],
  },

  // 21-26. Settings Section - Level 1 with Level 2 & 3 children
  {
    label: "Settings",
    route: "settings.general",
    icon: "⚙️",
    children: [
      {
        label: "System",
        children: [
          {
            label: "General Settings",
            route: "settings.general",
            badge: 1,
          },
          {
            label: "Payment Settings",
            route: "settings.payment",
          },
          {
            label: "Shipping Settings",
            route: "settings.shipping",
          },
        ],
      },
      {
        label: "User Management",
        children: [
          {
            label: "Profile",
            route: "profile.show",
            badge: 2,
          },
          {
            label: "Teams",
            route: "teams.show",
          },
        ],
      },
    ],
  },

  // 27-29. Tools Section - Level 1 with Level 2 children
  {
    label: "Tools",
    icon: "🔧",
    children: [
      {
        label: "Import/Export",
        route: "tools.import-export",
      },
      {
        label: "Backup & Restore",
        route: "tools.backup",
        badge: 1,
      },
    ],
  },

  // 30. Development - Level 1 with Level 2 children
  {
    label: "Development",
    icon: "💻",
    children: [
      {
        label: "Testing",
        route: "testing-route",
        badge: 1,
      },
      {
        label: "Welcome Page",
        route: "welcome",
      },
    ],
  },
];

// Method 1: Using a recursive function
function flattenMenu(menuItems) {
  const result = [];

  function flattenRecursive(items, parent = null) {
    items.forEach((item) => {
      // Create a copy of the item without children
      const flatItem = { ...item };
      delete flatItem.children;

      // Add parent reference if needed
      if (parent) {
        flatItem.parent = parent.label;
      }

      result.push(flatItem);

      // Recursively flatten children if they exist
      if (item.children && item.children.length > 0) {
        flattenRecursive(item.children, item);
      }
    });
  }

  flattenRecursive(menuItems);
  return result;
}

// Method 2: Using flatMap with recursion
function flattenMenuWithFlatMap(menuItems) {
  return menuItems.flatMap((item) => {
    const flatItem = { ...item };
    delete flatItem.children;

    if (item.children && item.children.length > 0) {
      return [flatItem, ...flattenMenuWithFlatMap(item.children)];
    }

    return [flatItem];
  });
}

// Method 3: Using reduce with recursion
function flattenMenuWithReduce(menuItems) {
  return menuItems.reduce((acc, item) => {
    const flatItem = { ...item };
    delete flatItem.children;

    acc.push(flatItem);

    if (item.children && item.children.length > 0) {
      acc.push(...flattenMenuWithReduce(item.children));
    }

    return acc;
  }, []);
}

// Method 4: Using a stack (iterative approach)
function flattenMenuIterative(menuItems) {
  const result = [];
  const stack = [...menuItems];

  while (stack.length > 0) {
    const item = stack.pop();
    const flatItem = { ...item };
    delete flatItem.children;

    result.push(flatItem);

    if (item.children && item.children.length > 0) {
      // Add children to stack in reverse order to maintain original order
      stack.push(...item.children.reverse());
    }
  }

  return result.reverse(); // Reverse to maintain original order
}

// Test all methods
console.log("=== Method 1: Recursive Function ===");
const flattened1 = flattenMenu(menuItems);
console.log(flattened1);

console.log("\n=== Method 2: flatMap with Recursion ===");
const flattened2 = flattenMenuWithFlatMap(menuItems);
console.log(flattened2);

console.log("\n=== Method 3: reduce with Recursion ===");
const flattened3 = flattenMenuWithReduce(menuItems);
console.log(flattened3);

console.log("\n=== Method 4: Iterative with Stack ===");
const flattened4 = flattenMenuIterative(menuItems);
console.log(flattened4);

// Verify all methods produce the same result
console.log("\n=== Verification ===");
console.log(
  "All methods produce same result:",
  JSON.stringify(flattened1) === JSON.stringify(flattened2) &&
    JSON.stringify(flattened2) === JSON.stringify(flattened3) &&
    JSON.stringify(flattened3) === JSON.stringify(flattened4)
);

// Show just the labels to see the structure
console.log("\n=== Labels Only ===");
flattened1.forEach((item, index) => {
  console.log(
    `${index + 1}. ${item.label} ${
      item.parent ? `(parent: ${item.parent})` : ""
    }`
  );
});
