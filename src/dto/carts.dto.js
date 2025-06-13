import crypto from "crypto";
const { PERSISTENCE } = process.env;

class CartsDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }

    this.user_id = data.user_id;
    this.products = data.products || [];
    this.state = data.state || "reserved";
  }
}

export default CartsDTO;