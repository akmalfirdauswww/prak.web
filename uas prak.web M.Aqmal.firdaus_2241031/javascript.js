// Base class for general CRUD operations
class Category {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    // Create (Add new item)
    createItem(id, data) {
        this.items.push({ id, ...data });
        console.log(`${this.name}: Added`, data);
    }

    // Read (List all items)
    readItems() {
        console.log(`${this.name} List:`, this.items);
        return this.items;
    }

    // Update (Modify existing item)
    updateItem(id, newData) {
        let item = this.items.find(item => item.id === id);
        if (item) {
            Object.assign(item, newData);
            console.log(`${this.name}: Updated`, item);
        } else {
            console.log(`${this.name}: Item with ID ${id} not found.`);
        }
    }

    // Delete (Remove item)
    deleteItem(id) {
        let index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            let removedItem = this.items.splice(index, 1);
            console.log(`${this.name}: Deleted`, removedItem[0]);
        } else {
            console.log(`${this.name}: Item with ID ${id} not found.`);
        }
    }
}

// Category List (Manages product categories)
class CategoryList extends Category {
    constructor() {
        super("Category");
    }
}

// Stock List (Tracks product stock)
class StockList extends Category {
    constructor() {
        super("Stock");
    }

    // Add stock quantity to an existing item
    addStock(id, quantity) {
        let item = this.items.find(item => item.id === id);
        if (item) {
            item.stock += quantity;
            console.log(`Stock updated: ${item.name}, New Stock: ${item.stock}`);
        } else {
            console.log(`Stock ID ${id} not found.`);
        }
    }
}

// Supplier Name List (Stores supplier details)
class SupplierList extends Category {
    constructor() {
        super("Supplier");
    }
}

// Supplier Transaction List (Tracks stock purchases from suppliers)
class SupplierTransactionList extends Category {
    constructor() {
        super("Supplier Transaction");
    }

    // Record a supplier transaction (adding stock)
    recordTransaction(transactionId, supplierId, stockId, quantity, price) {
        this.createItem(transactionId, { supplierId, stockId, quantity, price });
        console.log(`Supplier transaction recorded: Stock ${stockId} from Supplier ${supplierId}`);
    }
}

// Customer Transaction List (Tracks product sales)
class CustomerTransactionList extends Category {
    constructor() {
        super("Customer Transaction");
    }

    // Record a customer sale
    recordSale(transactionId, customerId, stockId, quantity, price) {
        this.createItem(transactionId, { customerId, stockId, quantity, price });
        console.log(`Customer transaction recorded: Stock ${stockId} sold to Customer ${customerId}`);
    }
}

// Create instances of each category
let categories = new CategoryList();
let stocks = new StockList();
let suppliers = new SupplierList();
let supplierTransactions = new SupplierTransactionList();
let customerTransactions = new CustomerTransactionList();

// Pengetesan

// Kategori
categories.createItem(1, { name: "Elektronik" });
categories.createItem(2, { name: "Furnitur" });
categories.readItems();

// Stock
stocks.createItem(101, { name: "Laptop", stock: 10 });
stocks.createItem(102, { name: "Meja", stock: 5 });
stocks.readItems();
stocks.addStock(101, 5);

// suppliers
suppliers.createItem(201, { name: "Tech Supplies.co" });
suppliers.createItem(202, { name: "Furniture World" });
suppliers.readItems();

// Transaksi Suppliers
supplierTransactions.recordTransaction(301, 201, 101, 10, 500);
supplierTransactions.readItems();

// Transaksi Produk
customerTransactions.recordSale(401, "Bayu", 101, 2, 1000);
customerTransactions.readItems();

