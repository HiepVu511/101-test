import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";

import { LoginData } from "../utils/types";
import { loginSchema } from "../utils/schemas";

export type LoginProps = {
  onLogin?: (data: LoginData) => void;
  customError?: string;
};

const Login = (props: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit((d) => props.onLogin && props.onLogin(d))}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            error={errors.username?.message}
            {...register("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
        {props.customError && <p>{props.customError}</p>}
      </Paper>
    </Container>
  );
};

export default Login;
