const Post = require("../models/post");

exports.getPostById = (req, res, next, id) => {
  Post.findById(id).exec((err, post) => {
    if (err) {
      return res.status(400).json({
        error: "PRODUCT NOT FOUND",
      });
    }
    req.post = post;
    next();
  });
};

exports.createPost = (req, res) => {
  const { title, imageUrl, tags, likes, comments, postedBy } = req.body;

  const post = new Post(req.body);
  post.save((err, post) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save post in DB",
      });
    }
    res.json({
      _id: post._id,
      title: post.title,
      imageUrl: post.imageUrl,
      postedBy: post.postedBy,
    });
  });
};

exports.getPost = (req, res) => {
  return res.json(req.post);
};

//DELETE CONTROLLERS
exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove((err, deletedPost) => {
    if (err) {
      return res.status(400).json({
        error: "FAILED TO DELTE THE PRODUCT",
      });
    }
    res.json({
      message: "DELETION WAS SUCCESS",
      deletedPost,
    });
  });
};

//UPDATE CONTROLLERS
exports.updatePost = (req, res) => {
  Post.findByIdAndUpdate(
    { _id: req.post._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, post) => {
      if (err) {
        return res.status(400).json({
          error: "YOU ARE NOT AUTHORIZED TO UPDATE THIS USER",
        });
      }

      res.json(post);
    }
  );
};

//PRODUCT LISTING
exports.getAllPosts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.limit ? req.query.limit : "_id";

  Post.find()
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "NO posts FOUND",
        });
      }
      res.json(posts);
    });
};

// exports.updateLike = (req, res) => {
//   for (let index = 0; index < likedUsers.length; index++) {
//     if (likedUsers[index]._id == req.body.postedBy) {
//       return false;
//     } else {
//       Post.findByIdAndUpdate(
//         { _id: req.post._id },
//         { $set: { likes: req.body.likes } },
//         { new: true, useFindAndModify: false },
//         (err, post) => {
//           if (err) {
//             return res.status(400).json({
//               error: "YOU ARE NOT AUTHORIZED TO UPDATE THIS USER",
//             });
//           }

//           res.json(post);
//         }
//       );
//     }
//   }
// };

