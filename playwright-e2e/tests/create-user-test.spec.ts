
import { test } from "../fixtures";
import { v4 as uuidv4 } from "uuid";

test("Create citizen user", async ({
    idamUtils
  }) => {
    const token = process.env.CREATE_USER_BEARER_TOKEN as string; //token retrieved in global.setup.ts
    const uniqueId = uuidv4();
    const email = `TEST_PRL_USER_citizen.${uniqueId}@test.local`; //change email to reflect the service you work in
    const forename = "fn_" + uniqueId.split("-")[0];
    const surname = "sn_" + uniqueId.split("-")[1];

    const user = await idamUtils.createUser(
        token,
        email,
        process.env.CITIZEN_PASSWORD as string,
        forename, 
        surname,
        ["citizen"]
    )
    console.log(user)
});