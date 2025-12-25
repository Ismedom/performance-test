// Example of flattening nested menu items with flexible ID structure
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
        id: "all",
        label: "All Products",
        route: "products.index",
        badge: 10,
      },
      {
        id: "create",
        label: "Add Product",
        route: "products.create",
        badge: 1,
      },
      {
        id: "catalog",
        label: "Catalog",
        badge: 4,
        children: [
          {
            id: "categories",
            label: "Categories",
            route: "products.categories",
            badge: 2,
          },
          {
            id: "inventory",
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
        id: "all",
        label: "All Orders",
        route: "orders.index",
        badge: 28,
      },
      {
        id: "pending",
        label: "Pending",
        route: "orders.pending",
        badge: 12,
      },
      {
        id: "completed",
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
        id: "all",
        label: "All Customers",
        route: "customers.index",
        badge: 5,
      },
      {
        id: "groups",
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
        id: "sales",
        label: "Sales Report",
        route: "reports.sales",
      },
      {
        id: "analytics",
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
        id: "campaigns",
        label: "Email Campaigns",
        route: "marketing.campaigns",
        badge: 2,
      },
      {
        id: "promotions",
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
        id: "system",
        label: "System",
        children: [
          {
            id: "general",
            label: "General Settings",
            route: "settings.general",
            badge: 1,
          },
          {
            id: "payment",
            label: "Payment Settings",
            route: "settings.payment",
          },
          {
            id: "shipping",
            label: "Shipping Settings",
            route: "settings.shipping",
          },
        ],
      },
      {
        id: "users",
        label: "User Management",
        children: [
          {
            id: "profile",
            label: "Profile",
            route: "profile.show",
            badge: 2,
          },
          {
            id: "teams",
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
        id: "import",
        label: "Import/Export",
        route: "tools.import-export",
      },
      {
        id: "backup",
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
        id: "testing",
        label: "Testing",
        route: "testing-route",
        badge: 1,
      },
      {
        id: "welcome",
        label: "Welcome Page",
        route: "welcome",
      },
    ],
  },
];

// Method 1: Recursive function with flexible ID structure
function flattenMenuFlexible(menuItems) {
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

// Method 2: Find item by route and get its hierarchy (works with flexible IDs)
function findItemByRouteAndHierarchy(flattenedMenu, route) {
  // Find the item with the matching route
  const targetItem = flattenedMenu.find((item) => item.route === route);

  if (!targetItem) {
    return null;
  }

  // Build the hierarchy path
  const hierarchy = [];
  let currentItem = targetItem;

  // Add the target item
  hierarchy.push(currentItem);

  // Walk up the hierarchy using parentId
  while (currentItem.parentId) {
    currentItem = flattenedMenu.find(
      (item) => item.id === currentItem.parentId
    );
    if (currentItem) {
      hierarchy.unshift(currentItem); // Add to beginning to maintain order
    }
  }

  return hierarchy;
}

// Method 3: Find all items that match a route pattern
function findItemsByRoutePattern(flattenedMenu, routePattern) {
  return flattenedMenu.filter(
    (item) => item.route && item.route.includes(routePattern)
  );
}

// Method 4: Find parent chain for any item
function getParentChain(flattenedMenu, itemId) {
  const chain = [];
  let currentItem = flattenedMenu.find((item) => item.id === itemId);

  if (!currentItem) {
    return chain;
  }

  // Add current item
  chain.push(currentItem);

  // Walk up the hierarchy
  while (currentItem.parentId) {
    currentItem = flattenedMenu.find(
      (item) => item.id === currentItem.parentId
    );
    if (currentItem) {
      chain.unshift(currentItem); // Add to beginning to maintain order
    }
  }

  return chain;
}

// Method 5: Build full hierarchical path for display
function buildHierarchicalPath(flattenedMenu, route) {
  const hierarchy = findItemByRouteAndHierarchy(flattenedMenu, route);

  if (!hierarchy) {
    return null;
  }

  return hierarchy.map((item) => ({
    id: item.id,
    label: item.label,
    route: item.route,
    level: item.level,
    parentId: item.parentId,
  }));
}

// Test the functions
const flattenedMenu = flattenMenuFlexible(menuItems);

console.log("=== Flattened Menu with Flexible IDs ===");
console.log(flattenedMenu);

console.log("\n=== Find Item by Route: products.categories ===");
const categoriesHierarchy = findItemByRouteAndHierarchy(
  flattenedMenu,
  "products.categories"
);
console.log("Hierarchy for products.categories:", categoriesHierarchy);

console.log("\n=== Find Item by Route: orders.pending ===");
const pendingHierarchy = findItemByRouteAndHierarchy(
  flattenedMenu,
  "orders.pending"
);
console.log("Hierarchy for orders.pending:", pendingHierarchy);

console.log("\n=== Find Item by Route: settings.general ===");
const settingsHierarchy = findItemByRouteAndHierarchy(
  flattenedMenu,
  "settings.general"
);
console.log("Hierarchy for settings.general:", settingsHierarchy);

console.log("\n=== Find Items by Route Pattern: products ===");
const productsItems = findItemsByRoutePattern(flattenedMenu, "products");
console.log('Items matching "products" pattern:', productsItems);

console.log("\n=== Find Items by Route Pattern: settings ===");
const settingsItems = findItemsByRoutePattern(flattenedMenu, "settings");
console.log('Items matching "settings" pattern:', settingsItems);

console.log("\n=== Get Parent Chain for categories ===");
const parentChain = getParentChain(flattenedMenu, "categories");
console.log("Parent chain for categories:", parentChain);

console.log("\n=== Formatted Hierarchy for products.categories ===");
if (categoriesHierarchy) {
  categoriesHierarchy.forEach((item, index) => {
    const indent = "  ".repeat(index);
    console.log(`${indent}${item.id}: ${item.label} [Level ${item.level}]`);
  });
}

console.log("\n=== Formatted Hierarchy for orders.pending ===");
if (pendingHierarchy) {
  pendingHierarchy.forEach((item, index) => {
    const indent = "  ".repeat(index);
    console.log(`${indent}${item.id}: ${item.label} [Level ${item.level}]`);
  });
}

console.log("\n=== Formatted Hierarchy for settings.general ===");
if (settingsHierarchy) {
  settingsHierarchy.forEach((item, index) => {
    const indent = "  ".repeat(index);
    console.log(`${indent}${item.id}: ${item.label} [Level ${item.level}]`);
  });
}

// Example: Filter to get specific route hierarchy
console.log("\n=== Filter Example: Get products.categories hierarchy ===");
const targetRoute = "products.categories";
const targetHierarchy = findItemByRouteAndHierarchy(flattenedMenu, targetRoute);

if (targetHierarchy) {
  console.log(`Found hierarchy for route "${targetRoute}":`);
  targetHierarchy.forEach((item, index) => {
    console.log(
      `  ${index + 1}. ${item.id}: ${item.label} (route: ${
        item.route || "no route"
      }) [Level ${item.level}]`
    );
  });
} else {
  console.log(`No item found with route "${targetRoute}"`);
}

// Example: Build hierarchical path for display
console.log("\n=== Build Hierarchical Path for products.categories ===");
const hierarchicalPath = buildHierarchicalPath(
  flattenedMenu,
  "products.categories"
);
if (hierarchicalPath) {
  console.log("Hierarchical path:", hierarchicalPath);
  console.log("Path for display:");
  hierarchicalPath.forEach((item, index) => {
    const separator = index === 0 ? "" : " > ";
    process.stdout.write(`${separator}${item.label}`);
  });
  console.log(); // New line
}

console.log("\n=== Build Hierarchical Path for settings.general ===");
const settingsPath = buildHierarchicalPath(flattenedMenu, "settings.general");
if (settingsPath) {
  console.log("Hierarchical path:", settingsPath);
  console.log("Path for display:");
  settingsPath.forEach((item, index) => {
    const separator = index === 0 ? "" : " > ";
    process.stdout.write(`${separator}${item.label}`);
  });
  console.log(); // New line
}
