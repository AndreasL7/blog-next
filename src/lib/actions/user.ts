import User from "../models/user.model";

import { connect } from "../mongodb/mongoose";

interface CreateOrUpdateUserProps {
  id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  email_addresses: { email_address: string }[];
  username: string;
}

export const createOrUpdateUser = async ({
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username,
}: CreateOrUpdateUserProps) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
          username: username,
        },
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.error("Error creating or updating user", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error deleting user", error);
  }
};
