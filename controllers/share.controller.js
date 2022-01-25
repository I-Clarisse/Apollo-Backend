import { Share } from "../models/share.model.js";
import lodash from "lodash";
const { pick } = lodash;

export const getShared = async (req, res) => {
  try {
    let shared = await (
      await Share.findById(req.params.id)
    ).select("-link -from -to");
    if (!shared) return res.status(400).send("Shared content not found!");
    return res.send({
      status: 200,
      message: ok,
      data: shared,
    });
  } catch (err) {
    res.status().send(err.message);
  }
};

export const share = async (req, res) => {
  try {
    let shared = new Share(pick(req.body, ["link", "from", "to"]));
    shared.sharedAt = new Date();
    try {
      await shared.save();
      return res.json({ message: "post shared!", status: 200 });
    } catch (err) {
      res.status(400).send(err.message);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateShared = async (req, res) => {
  try {
    try {
      let sharedInfo = await Share.findById(req.params.id);
      if (!sharedInfo)
        return res.status(400).send("shared content doesnot exist!");
      let link = req.body.link ? req.body.link : sharedInfo.link;
      let from = req.body.from ? req.body.from : sharedInfo.from;
      let to = req.body.to ? req.body.to : sharedInfo.to;
      let shared = await Share.findByIdAndUpdate(
        req.params.id,
        {
          link: link,
          to: to,
          from: to,
        },
        { new: true }
      );
      res.status(200).send({
        message: "shared content updated successfully!",
        data: shared,
      });
    } catch (err) {
      res.status(400).send(err.message);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteShared = async (req, res, next) => {
  try {
    let shared = await Share.findById(req.params.id);
    if (!shared) return res.status(200).send("shared content doesnot exist!");

    await Share.findByIdAndRemove(req.params.id);
    res.status(200).send("shared content deleted successfully!");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
