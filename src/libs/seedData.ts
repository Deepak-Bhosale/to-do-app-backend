import mongoose from "mongoose";
import * as bcrypt from "bcrypt";
import { userRepository } from "../repositories/user/UserRepository";
import { configuration } from "../config/configuration";

export default async () => {
  const userSeedDataCount = await userRepository.countUsers();

  if (!userSeedDataCount) {
    console.log("||  User Data is Seeding  ||");
    await userRepository.createUser(
      {
        originalId: new mongoose.Types.ObjectId(),
        firstName: "Deepak",
        lastName: "Bhosale",
        email: "deepak@gmail.com",
        password: await bcrypt.hash("Deepak@123", configuration.saltRounds),
        role: "general",
      },
      {}
    );
    console.log("||  User Data seeded successfully  ||");
  } else {
    console.log("||  User Data already seeded  ||");
  }
};
