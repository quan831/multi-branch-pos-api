const swaggerJsdoc = require(
    "swagger-jsdoc"
);

const swaggerUi = require(
    "swagger-ui-express"
);

const path = require("path");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title:
                "Multi Branch POS API",

            version: "1.0.0",

            description:
                "API documentation"
        },

        servers: [
            {
                url:
                    `${process.env.APP_URL || "http://localhost:3000"}/api`
            }
        ],

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1, readOnly: true },
                        username: { type: "string", example: "admin" },
                        role: { type: "string", example: "admin" },
                        branchId: { type: "integer", example: 1 },
                        createdAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true },
                        updatedAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true }
                    }
                },
                Product: { 
                    type: "object", 
                    properties: { 
                        id: { type: "integer", example: 1, readOnly: true },
                        name: { type: "string", example: "Cà phê sữa" },
                        price: {
                            type: "number",
                            format: "double",
                            example: 25000
                        },
                        description: { type: "string", example: "Cà phê sữa đá ngọt" },
                        createdAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true },
                        updatedAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true }
                    }
                },
                Branch: { 
                    type: "object", 
                    properties: { 
                        id: { type: "integer", example: 1, readOnly: true },
                        name: { type: "string", example: "Chi nhánh Quận 1" },
                        address: { type: "string", example: "123 Lê Lợi, Quận 1, TP.HCM" },
                        createdAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true },
                        updatedAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true }
                    }
                },
                Customer: { 
                    type: "object", 
                    properties: { 
                        id: { type: "integer", example: 1, readOnly: true },
                        name: { type: "string", example: "Nguyễn Văn A" },
                        phone: { type: "string", example: "0901234567" },
                        email: { type: "string", example: "nguyenvana@example.com" },
                        createdAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true },
                        updatedAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true }
                    }
                },
                Inventory: { 
                    type: "object", 
                    properties: { 
                        id: { type: "integer", example: 1, readOnly: true },
                        productId: { type: "integer", example: 1 },
                        branchId: { type: "integer", example: 1 },
                        quantity: { type: "integer", example: 100 },
                        createdAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true },
                        updatedAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true }
                    }
                },
                Order: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1, readOnly: true },
                        staffId: { type: "integer", example: 1 },
                        branchId: { type: "integer", example: 1 },
                        customerId: { type: "integer", example: 1 },
                        totalAmount: {
                            type: "number",
                            format: "double",
                            example: 50000
                        },
                        paymentMethod: { type: "string", example: "cash" },
                        syncStatus: { type: "string", example: "pending" },
                        items: {
                            type: "array",
                            items: { $ref: "#/components/schemas/OrderItem" }
                        },
                        createdAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true },
                        updatedAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true }
                    }
                },
                OrderItem: { 
                    type: "object", 
                    properties: { 
                        id: { type: "integer", example: 1, readOnly: true }, 
                        orderId: { type: "integer", example: 1 },
                        productId: { type: "integer", example: 1 },
                        quantity: { type: "integer", example: 2 },
                        price: {
                            type: "number",
                            format: "double",
                            example: 25000
                        },
                        createdAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true },
                        updatedAt: { type: "string", format: "date-time", example: "2023-01-01T00:00:00Z", readOnly: true }
                    }
                },
                LoginRequest: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: { type: "string", example: "admin" },
                        password: { type: "string", example: "123456" }
                    }
                },
                SyncOrdersRequest: {
                    type: "object",
                    properties: {
                        orders: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Order" }
                        }
                    }
                },
                SyncStatusUpdateRequest: {
                    type: "object",
                    required: ["orderIds", "status"],
                    properties: {
                        orderIds: {
                            type: "array",
                            items: { type: "integer" },
                            example: [1, 2, 3]
                        },
                        status: {
                            type: "string",
                            enum: ["synced", "pending", "failed"],
                            description: "New synchronization status for the specified orders",
                            example: "synced"
                        }
                    }
                }
            }
        }
    },

    apis: [
        path.join(
            __dirname,
            "../routes/*.js"
        )
    ]
};

const swaggerSpec =
    swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    swaggerSpec
};