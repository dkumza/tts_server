const commModels = require('../models/commModels');

module.exports.getProdComments = async (req, res, next) => {
  const { id } = req.params;

  const [commentsArr, error] = await commModels.getCommByID([id]);

  if (error) {
    console.log('getProdComments error ===', error);
    next({ msg: 'System error', status: 500 });
    return;
  }

  res.json(commentsArr);
};

module.exports.createProdComments = async (req, res, next) => {
  const { prod_id } = req.params;
  console.log(prod_id);

  const { comm_author, comm_context, comm_date } = req.body;
  console.log(req.body);
  const commData = [comm_author, comm_context, comm_date, prod_id];

  const [commentsArr, error] = await commModels.postNewCommByID(commData);

  if (error) {
    console.log('createComment error ===', error);
    next('System error');
    return;
  }

  if (commentsArr.affectedRows === 1) {
    res
      .status(201)
      .json({ msg: 'Success, comment created', comm_id: commentsArr.insertId });
    return;
  }

  next(commentsArr);
};
