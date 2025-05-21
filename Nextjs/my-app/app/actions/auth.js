import { SignupFormSchema } from "@/lib/definitions";
import { createSession } from "@/app/lib/session";
import axios from "axios";
import { redirect } from 'next/navigation'

export async function signup(state, formData) {
  const validateFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validateFields.data;
  // const user = {
  //   username,
  //   password,
  // };

  const def_admin = "rikinadmin";
  const def_password = "rikinadmin";


  try {
    // const res = await axios.post("/api/user", user);
    // console.log(res.data);
    // const { username,role } = res?.data;

    // if (role === "USER") {
    //   return {
    //     errors: {
    //       invalid: ["No User Role Can Enter!!"],
    //     },
    //   };
    // }
    if(def_admin == username && def_password == password ){
      
      await createSession(username)
    }
   
  } catch (error) {
    console.log(error);
    return {
      errors: {
        invalid: ["Incorrect username or password"],
      },
    };
  }
  redirect("/")
}

