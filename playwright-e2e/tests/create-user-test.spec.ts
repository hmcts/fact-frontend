import { test } from "../fixtures";
import { v4 as uuidv4 } from "uuid";

test("Create citizen user", async ({ idamUtils }) => {
  // Bearer token was generated in global.setup.ts and is pulled via environment variable.
  const token = process.env.CREATE_USER_BEARER_TOKEN as string; 
  const uniqueId = uuidv4();

  // You can change these user details (email, forename, surname, etc.) to suit your needs.
  // The uniqueId ensures each user is distinct, minimising overlap when creating multiple test users.
  const email = `TEST_PRL_USER_citizen.${uniqueId}@test.local`;
  const forename = "fn_" + uniqueId.split("-")[0];
  const surname = "sn_" + uniqueId.split("-")[1];
  const password = process.env.CITIZEN_PASSWORD as string; // Password is securely pulled from Azure Key Vault via environment variable.
  
  //Create a citizen user using IdamUtils fixture in playwright common library
  const user = await idamUtils.createUser({
    bearerToken: token,
    password,
    user: {
      email,
      forename,
      surname,
      roleNames: ["citizen"], 
    },
  });

  console.log(user);
});
