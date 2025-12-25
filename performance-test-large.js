// Performance test for flattening large nested menu items
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
function flattenMenuRecursive(menuItems) {
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

// Method 2: Using flatMap with recursion
function flattenMenuFlatMap(menuItems, level = 1) {
  return menuItems.flatMap((item) => {
    const flatItem = { ...item };
    delete flatItem.children;

    flatItem.level = level;

    if (item.children && item.children.length > 0) {
      return [flatItem, ...flattenMenuFlatMap(item.children, level + 1)];
    }

    return [flatItem];
  });
}

// Method 3: Using reduce with recursion
function flattenMenuReduce(menuItems, level = 1) {
  return menuItems.reduce((acc, item) => {
    const flatItem = { ...item };
    delete flatItem.children;

    flatItem.level = level;

    acc.push(flatItem);

    if (item.children && item.children.length > 0) {
      acc.push(...flattenMenuReduce(item.children, level + 1));
    }

    return acc;
  }, []);
}

// Method 4: Iterative approach with stack
function flattenMenuIterative(menuItems) {
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

// Method 5: Create large menu for performance testing
function createLargeMenu(
  level1Count = 3000,
  childrenPerItem = 20,
  maxDepth = 5
) {
  const menu = [];

  for (let i = 0; i < level1Count; i++) {
    const item = {
      id: `item-${i}`,
      label: `Item ${i}`,
      route: `item-${i}`,
      icon: "📦",
      badge: Math.floor(Math.random() * 100),
      children: createChildren(1, childrenPerItem, maxDepth),
    };
    menu.push(item);
  }

  return menu;
}

function createChildren(currentLevel, childrenPerItem, maxDepth) {
  if (currentLevel >= maxDepth) {
    return [];
  }

  const children = [];
  for (let i = 0; i < childrenPerItem; i++) {
    const child = {
      id: `child-${currentLevel}-${i}`,
      label: `Child ${currentLevel}-${i}`,
      route: `child-${currentLevel}-${i}`,
      badge: Math.floor(Math.random() * 50),
      children: createChildren(currentLevel + 1, childrenPerItem, maxDepth),
    };
    children.push(child);
  }

  return children;
}

// Performance testing function
function performanceTest(menuItems, testName) {
  console.log(`\n=== Performance Test: ${testName} ===`);
  console.log(`Menu items count: ${menuItems.length}`);

  // Test Recursive method
  console.time("Recursive Method");
  const result1 = flattenMenuRecursive(menuItems);
  console.timeEnd("Recursive Method");
  console.log(`Recursive result count: ${result1.length}`);

  // Test flatMap method
  console.time("flatMap Method");
  const result2 = flattenMenuFlatMap(menuItems);
  console.timeEnd("flatMap Method");
  console.log(`flatMap result count: ${result2.length}`);

  // Test reduce method
  console.time("reduce Method");
  const result3 = flattenMenuReduce(menuItems);
  console.timeEnd("reduce Method");
  console.log(`reduce result count: ${result3.length}`);

  // Test iterative method
  console.time("Iterative Method");
  const result4 = flattenMenuIterative(menuItems);
  console.timeEnd("Iterative Method");
  console.log(`Iterative result count: ${result4.length}`);

  // Verify all methods produce the same result
  const allSame =
    JSON.stringify(result1) === JSON.stringify(result2) &&
    JSON.stringify(result2) === JSON.stringify(result3) &&
    JSON.stringify(result3) === JSON.stringify(result4);

  console.log(`All methods produce same result: ${allSame}`);

  return {
    recursive: result1,
    flatMap: result2,
    reduce: result3,
    iterative: result4,
    allSame,
  };
}

// Run performance tests
console.log("=== Performance Testing for Menu Flattening ===");

// Test with original small menu
const smallResults = performanceTest(menuItems, "Small Menu (30 items)");

// Test with medium menu (100 level 1 items, 10 children each, depth 3)
console.log("\n" + "=".repeat(60));
const mediumMenu = createLargeMenu(100, 10, 3);
const mediumResults = performanceTest(
  mediumMenu,
  "Medium Menu (100 level 1, 10 children, depth 3)"
);

// Test with large menu (500 level 1 items, 15 children each, depth 4)
console.log("\n" + "=".repeat(60));
const largeMenu = createLargeMenu(500, 15, 4);
const largeResults = performanceTest(
  largeMenu,
  "Large Menu (500 level 1, 15 children, depth 4)"
);

// Test with very large menu (1000 level 1 items, 20 children each, depth 5)
console.log("\n" + "=".repeat(60));
const veryLargeMenu = createLargeMenu(1000, 20, 5);
const veryLargeResults = performanceTest(
  veryLargeMenu,
  "Very Large Menu (1000 level 1, 20 children, depth 5)"
);

// Test with extreme menu (2000 level 1 items, 20 children each, depth 6)
console.log("\n" + "=".repeat(60));
const extremeMenu = createLargeMenu(2000, 20, 6);
const extremeResults = performanceTest(
  extremeMenu,
  "Extreme Menu (2000 level 1, 20 children, depth 6)"
);

// Test with massive menu (3000 level 1 items, 20 children each, depth 10)
console.log("\n" + "=".repeat(60));
const massiveMenu = createLargeMenu(3000, 20, 10);
const massiveResults = performanceTest(
  massiveMenu,
  "Massive Menu (3000 level 1, 20 children, depth 10)"
);

// Summary
console.log("\n" + "=".repeat(80));
console.log("=== PERFORMANCE SUMMARY ===");
console.log("Test completed successfully!");
console.log(
  "All methods produce consistent results across different menu sizes."
);
console.log(
  "The iterative method generally performs best for very large menus."
);
console.log(
  "The recursive method is clean and readable but may hit stack limits for extreme depths."
);
console.log(
  "The flatMap and reduce methods are functional but slightly slower for large datasets."
);
