const model = require("../models/model");

async function create_Categories(req, res) {
    try {
        const newCategory = new model.categories({
            type: "Savings",
            color: "#FFCC66"
        });

        const savedCategory = await newCategory.save();

        return res.status(201).json(savedCategory);
    } catch (error) {
        console.error("Error while creating category:", error);
        return res.status(500).json({ message: "Error while creating category", error });
    }
}


async function get_Categories(req, res){
    let data = await model.categories.find({})
    let filter = await data.map(v => Object.assign({}, {type: v.type, color: v.color}))
    return res.json(filter)
}

// async function create_Transaction(req, res){
//     if(!req.body) return res.status(400).json("Post HTTP data not provided")
//     let {name, type, amount} = req.body;

//     const create = await new model.transaction(
//         {
//             name, 
//             type,
//             amount,
//             date: new Date()
//         }
//     )

//     create.save(function(err){
//         if(!err) return res.json(create)
//         return res.status(400).json("Error while creating transaction ", err)
//     })
// }

async function create_Transaction(req, res) {
    try {
        if (!req.body) return res.status(400).json("Post HTTP data not provided");

        const { name, type, amount } = req.body;

        const newTransaction = new model.transaction({
            name,
            type,
            amount,
            date: new Date()
        });

        await newTransaction.save();

        return res.status(201).json(newTransaction);
    } catch (error) {
        console.error("Error while creating transaction:", error);
        return res.status(500).json({ message: "Error while creating transaction", error });
    }
}


async function get_Transaction(req, res){
    let data = await model.transaction.find({})
    return res.json(data)
}

async function delete_Transaction(req, res) {
    try {
        if (!req.body) return res.status(400).json({ message: "Request body not found." });

        await model.transaction.deleteOne(req.body);

        return res.json("Record Deleted...");
    } catch (error) {
        console.error("Error while deleting transaction:", error);
        return res.status(500).json({ message: "Error while deleting transaction", error });
    }
}

async function get_Labels(req, res){
    model.transaction.aggregate([
        {
            $lookup:{
                from: "categories",
                localField: "type",
                foreignField: "type",
                as: "categories_info"
            }
        },
        {
            $unwind: "$categories_info"
        }
    ]).then(result => {
        let data = result.map(v => Object.assign({}, {_id: v._id, name: v.name, type: v.type, amount: v.amount, color: v.categories_info['color']}))
        res.json(data)
    }).catch(error => {
        res.status(400).json("Lookup collection error")
    })
}

// async function get_Labels(req, res) {
//     try {
//         const result = await model.transaction.aggregate([
//             {
//                 $lookup: {
//                     from: "categories",
//                     localField: "type",
//                     foreignField: "type",
//                     as: "categories_info"
//                 }
//             },
//             {
//                 $unwind: "$categories_info"
//             },
//             {
//                 $group: {
//                     _id: "$_id",
//                     name: { $first: "$name" },
//                     type: { $first: "$type" },
//                     amount: { $first: "$amount" },
//                     color: { $first: "$categories_info.color" }
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     name: 1,
//                     type: 1,
//                     amount: 1,
//                     color: 1
//                 }
//             }
//         ]);
        
//         return res.json(result);
        
//     } catch (error) {
//         console.error("Error while fetching labels:", error);
//         return res.status(500).json({ message: "Error while fetching labels", error });
//     }
// }


module.exports = {
    create_Categories,
    get_Categories,
    create_Transaction,
    get_Transaction,
    delete_Transaction,
    get_Labels
}