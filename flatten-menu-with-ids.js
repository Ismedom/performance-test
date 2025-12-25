// Example of flattening nested menu items with ID identification
const menuItems = [
  // 1. Dashboard - Level 1 Independent
  {
    id: "dashboard",
    label: "Dashboard",
    route: "dashboard",
    icon: "🏠",
    badge: 3,
  },

  {
    id: "products",
    label: "Products",
    icon: "📦",
    badge: 15,
    children: [
      {
        id: "products-all",
        label: "All Products",
        route: "products.index",
        badge: 10,
      },
      {
        id: "products-create",
        label: "Add Product",
        route: "products.create",
        badge: 1,
      },
      {
        id: "products-catalog",
        label: "Catalog",
        badge: 4,
        children: [
          {
            id: "products-categories",
            label: "Categories",
            route: "products.categories",
            badge: 2,
          },
          {
            id: "products-inventory",
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
    id: "orders",
    label: "Orders",
    icon: "🛒",
    badge: 28,
    children: [
      {
        id: "orders-all",
        label: "All Orders",
        route: "orders.index",
        badge: 28,
      },
      {
        id: "orders-pending",
        label: "Pending",
        route: "orders.pending",
        badge: 12,
      },
      {
        id: "orders-completed",
        label: "Completed",
        route: "orders.completed",
        badge: 16,
      },
    ],
  },

  // 12-14. Customers Section - Level 1 with Level 2 children
  {
    id: "customers",
    label: "Customers",
    icon: "👥",
    badge: 8,
    children: [
      {
        id: "customers-all",
        label: "All Customers",
        route: "customers.index",
        badge: 5,
      },
      {
        id: "customers-groups",
        label: "Customer Groups",
        route: "customers.groups",
        badge: 3,
      },
    ],
  },

  // 15-17. Reports Section - Level 1 with Level 2 children
  {
    id: "reports",
    label: "Reports",
    icon: "📊",
    children: [
      {
        id: "reports-sales",
        label: "Sales Report",
        route: "reports.sales",
      },
      {
        id: "reports-analytics",
        label: "Analytics",
        route: "reports.analytics",
        badge: 2,
      },
    ],
  },

  // 18-20. Marketing Section - Level 1 with Level 2 children
  {
    id: "marketing",
    label: "Marketing",
    icon: "📢",
    badge: 4,
    children: [
      {
        id: "marketing-campaigns",
        label: "Email Campaigns",
        route: "marketing.campaigns",
        badge: 2,
      },
      {
        id: "marketing-promotions",
        label: "Promotions",
        route: "marketing.promotions",
        badge: 2,
      },
    ],
  },

  // 21-26. Settings Section - Level 1 with Level 2 & 3 children
  {
    id: "settings",
    label: "Settings",
    route: "settings.general",
    icon: "⚙️",
    children: [
      {
        id: "settings-system",
        label: "System",
        children: [
          {
            id: "settings-general",
            label: "General Settings",
            route: "settings.general",
            badge: 1,
          },
          {
            id: "settings-payment",
            label: "Payment Settings",
            route: "settings.payment",
          },
          {
            id: "settings-shipping",
            label: "Shipping Settings",
            route: "settings.shipping",
          },
        ],
      },
      {
        id: "settings-users",
        label: "User Management",
        children: [
          {
            id: "settings-profile",
            label: "Profile",
            route: "profile.show",
            badge: 2,
          },
          {
            id: "settings-teams",
            label: "Teams",
            route: "teams.show",
          },
        ],
      },
    ],
  },

  // 27-29. Tools Section - Level 1 with Level 2 children
  {
    id: "tools",
    label: "Tools",
    icon: "🔧",
    children: [
      {
        id: "tools-import",
        label: "Import/Export",
        route: "tools.import-export",
      },
      {
        id: "tools-backup",
        label: "Backup & Restore",
        route: "tools.backup",
        badge: 1,
      },
    ],
  },

  // 30. Development - Level 1 with Level 2 children
  {
    id: "development",
    label: "Development",
    icon: "💻",
    children: [
      {
        id: "development-testing",
        label: "Testing",
        route: "testing-route",
        badge: 1,
      },
      {
        id: "development-welcome",
        label: "Welcome Page",
        route: "welcome",
      },
    ],
  },
];

// Method 1: Recursive function with ID and level identification
function flattenMenuWithIds(menuItems) {
  const result = [];

  function flattenRecursive(items, parent = null, level = 1) {
    items.forEach((item) => {
      // Create a copy of the item without children
      const flatItem = { ...item };
      delete flatItem.children;

      // Add level and parent information
      flatItem.level = level;
      if (parent) {
        flatItem.parentId = parent.id;
        flatItem.parentLabel = parent.label;
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

// Method 2: Using flatMap with ID and level tracking
function flattenMenuWithFlatMapAndIds(menuItems, level = 1) {
  return menuItems.flatMap((item) => {
    const flatItem = { ...item };
    delete flatItem.children;

    flatItem.level = level;

    if (item.children && item.children.length > 0) {
      return [
        flatItem,
        ...flattenMenuWithFlatMapAndIds(item.children, level + 1),
      ];
    }

    return [flatItem];
  });
}

// Method 3: Using reduce with ID and level tracking
function flattenMenuWithReduceAndIds(menuItems, level = 1) {
  return menuItems.reduce((acc, item) => {
    const flatItem = { ...item };
    delete flatItem.children;

    flatItem.level = level;

    acc.push(flatItem);

    if (item.children && item.children.length > 0) {
      acc.push(...flattenMenuWithReduceAndIds(item.children, level + 1));
    }

    return acc;
  }, []);
}

// Method 4: Iterative approach with ID and level tracking
function flattenMenuIterativeWithIds(menuItems) {
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
console.log("=== Method 1: Recursive Function with IDs and Levels ===");
const flattened1 = flattenMenuWithIds(menuItems);
console.log(flattened1);

console.log("\n=== Method 2: flatMap with IDs and Levels ===");
const flattened2 = flattenMenuWithFlatMapAndIds(menuItems);
console.log(flattened2);

console.log("\n=== Method 3: reduce with IDs and Levels ===");
const flattened3 = flattenMenuWithReduceAndIds(menuItems);
console.log(flattened3);

console.log("\n=== Method 4: Iterative with IDs and Levels ===");
const flattened4 = flattenMenuIterativeWithIds(menuItems);
console.log(flattened4);

// Show formatted output with IDs, levels, and hierarchy
console.log("\n=== Formatted Output with IDs, Levels, and Hierarchy ===");
flattened1.forEach((item, index) => {
  const indent = "  ".repeat(item.level - 1);
  const parentInfo = item.parentId
    ? ` (parent: ${item.parentId} - ${item.parentLabel})`
    : "";
  console.log(
    `${index + 1}. ${indent}${item.id}: ${item.label} [Level ${
      item.level
    }]${parentInfo}`
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
    const parentInfo = item.parentId ? ` (parent: ${item.parentId})` : "";
    console.log(`  - ${item.id}: ${item.label}${parentInfo}`);
  });
});

// Count items by level
console.log("\n=== Count by Level ===");
Object.keys(byLevel).forEach((level) => {
  console.log(`Level ${level}: ${byLevel[level].length} items`);
});

// Find item by ID
console.log("\n=== Find Item by ID ===");
function findItemById(id) {
  return flattened1.find((item) => item.id === id);
}

const productsItem = findItemById("products");
console.log("Products item:", productsItem);

const categoriesItem = findItemById("products-categories");
console.log("Categories item:", categoriesItem);

// Find children of a specific item
console.log("\n=== Find Children of Products ===");
const productsChildren = flattened1.filter(
  (item) => item.parentId === "products"
);
console.log("Products children:", productsChildren);

// Find all descendants of a specific item
console.log("\n=== Find All Descendants of Products ===");
function findDescendants(parentId) {
  const descendants = [];
  const queue = [parentId];

  while (queue.length > 0) {
    const currentId = queue.shift();
    const children = flattened1.filter((item) => item.parentId === currentId);
    descendants.push(...children);
    queue.push(...children.map((child) => child.id));
  }

  return descendants;
}

const allProductsDescendants = findDescendants("products");
console.log("All Products descendants:", allProductsDescendants);
