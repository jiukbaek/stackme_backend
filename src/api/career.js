import express from "express";
import Career from "../../models/Career";
import { compareId } from "../../utils/utils";
import status from "../../utils/statusStr";

const router = express.Router();

router.get("/", async (req, res) => {
  const { user_id } = req.user;

  const careers = await Career.findAll({
    where: { user_id },
    order: [["id", "DESC"]]
  });

  if (careers) {
    return res.status(200).json({ data: careers });
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

router.get("/:id", async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const career = await Career.findOne({ where: { id } });

  if (career) {
    if (compareId(career.user_id, user_id)) {
      return res.status(200).json({ data: career });
    } else {
      return res.status(403).json({ msg: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

router.post("/", async (req, res) => {
  const { user_id } = req.user;
  const {
    join_date = null,
    end_date = null,
    company = null,
    duty = null
  } = req.body;
  console.log(req.body);
  if (!join_date || !company || !duty)
    return res.status(404).json({ msg: status.INVALIDREQ });

  const career = await Career.create({
    user_id,
    join_date,
    end_date,
    company,
    duty
  });

  return res.status(200).json({ data: career });
});

router.patch("/:id", async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const career = await Career.findOne({ where: { id } });
  const values = req.body;

  if (career) {
    if (compareId(career.user_id, user_id)) {
      const updated = await career.update({ ...values });
      return res.status(200).json({ data: updated });
    } else {
      return res.status(403).json({ msg: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

router.delete("/:id", async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  const career = await Career.findOne({ where: { id } });

  if (career) {
    if (compareId(career.user_id, user_id)) {
      const deleted = await career.destroy();
      return res.status(200).json({ data: deleted });
    } else {
      return res.status(403).json({ msg: status.UNAUTH });
    }
  } else {
    return res.status(404).json({ msg: status.NODATA });
  }
});

export default router;
