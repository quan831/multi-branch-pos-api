const { Order, Inventory, Product, Branch, User } = require("../models/associations");
const { Op } = require("sequelize");
const sequelize = require("../config/database");

exports.getStats = async (req, res) => {
    try {
        let branchId = req.query.branchId;
        
        // If not admin, force their own branch
        if (req.user.role !== 'admin') {
            branchId = req.user.branchId;
        } else if (branchId === 'all') {
            branchId = null;
        }

        // 1. Total Revenue (Current Month)
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const revenueWhere = {
            createdAt: { [Op.gte]: startOfMonth }
        };
        if (branchId) revenueWhere.branchId = branchId;

        const totalRevenue = await Order.sum('totalAmount', { where: revenueWhere }) || 0;

        // 2. Total Orders (Current Month)
        const totalOrders = await Order.count({ where: revenueWhere });

        // 3. Low Stock Count (< 10)
        const stockWhere = {
            quantity: { [Op.lt]: 10 }
        };
        if (branchId) stockWhere.branchId = branchId;
        const lowStockCount = await Inventory.count({ where: stockWhere });

        // 4. Total Products
        const totalProducts = await Product.count();

        // 5. Recent Activity (Last 5 orders)
        const recentActivityWhere = branchId ? { branchId } : {};
        const recentOrders = await Order.findAll({
            where: recentActivityWhere,
            limit: 5,
            order: [['createdAt', 'DESC']],
            include: [
                { model: Branch, attributes: ['name'] },
                { model: User, attributes: ['username'] }
            ]
        });

        // 6. Revenue by Branch (For Admin 'all' view)
        let revenueByBranch = [];
        if (req.user.role === 'admin' && !branchId) {
            revenueByBranch = await Order.findAll({
                where: { createdAt: { [Op.gte]: startOfMonth } },
                attributes: [
                    'branchId',
                    [sequelize.fn('SUM', sequelize.col('totalAmount')), 'revenue']
                ],
                include: [{ model: Branch, attributes: ['name'] }],
                group: ['branchId', 'Branch.id'],
                raw: true,
                nest: true
            });
        }

        res.json({
            success: true,
            data: {
                totalRevenue,
                totalOrders,
                lowStockCount,
                totalProducts,
                recentOrders,
                revenueByBranch
            }
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
