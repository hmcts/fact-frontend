import { test } from "../fixtures";
import { v4 as uuidv4 } from "uuid";

test("Create citizen user", async ({ idamUtils }) => {
    const token = process.env.CREATE_USER_BEARER_TOKEN as string;
    const uniqueId = uuidv4();
    const email = `TEST_PRL_USER_citizen.${uniqueId}@test.local`;
    const forename = "fn_" + uniqueId.split("-")[0];
    const surname = "sn_" + uniqueId.split("-")[1];
    const password = process.env.CITIZEN_PASSWORD as string;

    const user = await idamUtils.createUser({
        bearerToken: token,
        email,
        password,
        forename,
        surname,
        roleNames: ["citizen"]
    });

    console.log(user);
});
