
const TableData = require('../model/table.model.js')



const createUserData = async(req, res) => {
    // taking data from body
    const { avatar, name, description, amount, checkbox } = req.body;

    // veryfying if user submitted all data or not (will do it in frontend also to get fast error)
    if(!name){
        return res.status(400).json({message: "Please enter name"})
    }
    if(!description){
        return res.status(400).json({message: "Please enter description"})
    }
    if(!amount){
        return res.status(400).json({message: "Please enter amount"})
    }

    // try catch for better error handling
    try{
        const tableData = await TableData.create({name, description, amount, avatar, checkbox})
        res.status(200).json(tableData)

    }catch(error){
        console.error('Getting error while saving table data', error)
        return res.status(500).json({message: "server error while saving data"})
    }
}



const getAllTableData = async(req, res) => {
    // finding table data
    try{
        const tableData = await TableData.find()
        // if data in table is not available then return this message
        if(!tableData){
            return res.status(400).json({message: "No data to available"})
        }
        const totalDocuments = await TableData.countDocuments();
        // console.log(totalDocuments)

        res.status(200).json({
            tableData,
            totalDocuments
        })
    }catch(error){
        console.error("getting error while finding all the data", error)
        return res.status(500).json({message: "not able to fetch data"})
    }
}


const getTenUserData = async(req, res) => {
    try{
        // getting data like page numberr and row limit from query and skip formula
        const page = parseInt(req.query.page) || 1;
        const rowLimit = parseInt(req.query.limit) || 10;
        const rowNumsToSkip = (page - 1) * rowLimit;

        const tableTenData = await TableData.find().skip(rowNumsToSkip).limit(rowLimit)

        const totalDocuments = await TableData.countDocuments();


        return res.status(200).json({
            data: tableTenData,
            totalData: totalDocuments,
            currentPage: page,
            totalPages: Math.ceil(totalDocuments / rowLimit),
            rowLimit: rowLimit
        })



    }catch(error){
        console.error("getting error while finding limited the data", error)
        return res.status(500).json({message: "not able to fetch data"})
    }
}


const updateTableData = async(req, res) => {
    try{
        const {checkbox} = req.body;
        const {id} = req.params;

        const updatedTable = await TableData.findByIdAndUpdate(
            id,
            { checkbox: checkbox},
            { new: true}
        )

        return res.status(200).json({
            message: 'checked data successfully',
            data: updatedTable
        })
    }catch(error){
        console.error("getting error while updating the checkbox", error)
        return res.status(500).json({message: "not able to update data"})
    }
}


const deleteTableRow = async(req, res) => {
    try{
        const {id} = req.params;

        await TableData.findByIdAndDelete(id)

        return res.status(200).json({
            message: "Row data deleted successfully"
        })
    }catch(error){
        console.log("not able to delete, please do it again later", error)
        return res.status(500).json({message: "not able to delete, please do it again later"})
    }
}






module.exports = {createUserData, getAllTableData, getTenUserData, getTenUserData, updateTableData, deleteTableRow}

// 1. create userData: Done
// 2. get userData all: Done
// 3. get userData 10 per page: 10 row per page: Done
// 4. update checkbox: working: done
// 5. delete user: deleted: checked: Done



