// Example of flattening nested menu items with level identification
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

// Method 1: Recursive function with level identification
function flattenMenuWithLevels(menuItems) {
  const result = [];

  function flattenRecursive(items, parent = null, level = 1) {
    items.forEach((item) => {
      // Create a copy of the item without children
      const flatItem = { ...item };
      delete flatItem.children;

      // Add level and parent information
      flatItem.level = level;
      if (parent) {
        flatItem.parent = parent.label;
      }

      result.push(flatItem);

      // Recursively flatten children if they exist
      if (item.children && item.children.length > 0) {
        flattenRecursive(item.children, item, level + 1);
      }
    });
  }

  flattenRecursive(menuItems);
  return result;
}

// Method 2: Using flatMap with level tracking
function flattenMenuWithFlatMapAndLevels(menuItems, level = 1) {
  return menuItems.flatMap((item) => {
    const flatItem = { ...item };
    delete flatItem.children;

    flatItem.level = level;

    if (item.children && item.children.length > 0) {
      return [
        flatItem,
        ...flattenMenuWithFlatMapAndLevels(item.children, level + 1),
      ];
    }

    return [flatItem];
  });
}

// Method 3: Using reduce with level tracking
function flattenMenuWithReduceAndLevels(menuItems, level = 1) {
  return menuItems.reduce((acc, item) => {
    const flatItem = { ...item };
    delete flatItem.children;

    flatItem.level = level;

    acc.push(flatItem);

    if (item.children && item.children.length > 0) {
      acc.push(...flattenMenuWithReduceAndLevels(item.children, level + 1));
    }

    return acc;
  }, []);
}

// Method 4: Iterative approach with level tracking
function flattenMenuIterativeWithLevels(menuItems) {
  const result = [];
  const stack = menuItems.map((item) => ({ item, level: 1 }));

  while (stack.length > 0) {
    const { item, level } = stack.pop();
    const flatItem = { ...item };
    delete flatItem.children;

    flatItem.level = level;

    result.push(flatItem);

    if (item.children && item.children.length > 0) {
      // Add children to stack in reverse order to maintain original order
      const children = item.children.map((child) => ({
        item: child,
        level: level + 1,
      }));
      stack.push(...children.reverse());
    }
  }

  return result.reverse(); // Reverse to maintain original order
}

// Test all methods
console.log("=== Method 1: Recursive Function with Levels ===");
const flattened1 = flattenMenuWithLevels(menuItems);
console.log(flattened1);

console.log("\n=== Method 2: flatMap with Levels ===");
const flattened2 = flattenMenuWithFlatMapAndLevels(menuItems);
console.log(flattened2);

console.log("\n=== Method 3: reduce with Levels ===");
const flattened3 = flattenMenuWithReduceAndLevels(menuItems);
console.log(flattened3);

console.log("\n=== Method 4: Iterative with Levels ===");
const flattened4 = flattenMenuIterativeWithLevels(menuItems);
console.log(flattened4);

// Show formatted output with levels
console.log("\n=== Formatted Output with Levels ===");
flattened1.forEach((item, index) => {
  const indent = "  ".repeat(item.level - 1);
  const parentInfo = item.parent ? ` (parent: ${item.parent})` : "";
  console.log(
    `${index + 1}. ${indent}${item.label} [Level ${item.level}]${parentInfo}`
  );
});

// Group by level
console.log("\n=== Grouped by Level ===");
const byLevel = flattened1.reduce((acc, item) => {
  if (!acc[item.level]) {
    acc[item.level] = [];
  }
  acc[item.level].push(item);
  return acc;
}, {});

Object.keys(byLevel).forEach((level) => {
  console.log(`\nLevel ${level}:`);
  byLevel[level].forEach((item) => {
    const parentInfo = item.parent ? ` (parent: ${item.parent})` : "";
    console.log(`  - ${item.label}${parentInfo}`);
  });
});

// Count items by level
console.log("\n=== Count by Level ===");
Object.keys(byLevel).forEach((level) => {
  console.log(`Level ${level}: ${byLevel[level].length} items`);
});
