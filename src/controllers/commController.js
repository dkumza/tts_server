const commModels = require('../models/commModels');

module.exports.getProdComments = async (req, res, next) => {
  const { id } = req.params;

  const [commentsArr, error] = await commModels.getCommByID([id]);

  if (error) {
    console.log('getPostComments error ===', error);
    next({ message: 'System error', status: 500 });
    return;
  }

  res.json(commentsArr);
};

module.exports.createProdComments = async (req, res, next) => {
  const { id } = req.params;
  console.log('id:', id);

  const { comm_author, comm_context } = req.body;
  const commData = [comm_author, comm_context, id];

  const [commentsArr, error] = await commModels.postNewCommByID(commData);

  if (error) {
    console.log('createComment error ===', error);
    next('System error');
    return;
  }
  console.log('commentsArr ===', commentsArr);
  if (commentsArr.affectedRows === 1) {
    res.status(201).json({ msg: 'Success comment created', comm_id: commentsArr.insertId });
    return;
  }

  next(commentsArr);
};
