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
  const { comm_author, comm_context, comm_date } = req.body;
  const { userID } = req;

  const commData = [comm_author, userID, comm_context, comm_date, prod_id];

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

module.exports.deleteCommByID = async (req, res, next) => {
  const { comm_id } = req.params;
  // validate if comment author ID = user ID
  const [commToCheck] = await commModels.checkSingleCommByID([comm_id]);

  if (+commToCheck[0].user_id !== +req.userID) {
    return next({ msg: 'Auth Failed, check user ID', status: 401 });
  }

  const [comment, error] = await commModels.deleteCommByID([comm_id]);

  if (error) return next(error);

  if (comment.affectedRows === 1) {
    return res.json({ msg: 'Your comment was deleted' });
  }

  if (comment.affectedRows === 0) {
    return res.status(500).json({
      msg: `DELETE comment with ID ${comm_id} was unsuccessfully. Check ID`,
    });
  }

  console.log(comm_id);
};
