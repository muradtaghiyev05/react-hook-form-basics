import { useForm } from 'react-hook-form'

function App() {

  const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm({
    mode: "onChange"
  });

  const watchName = watch("name");

  // when submitted successfully
  const onSubmit = (data) => {
    console.log("Registered!");
    console.log(`Hello, ${watchName}.You registered successfully`);
  }

  // when submition failed
  const onErrors = (errors) => {
    console.log("Errors");
    console.log(errors);
  }

  const registerOptions = {
    name: {
      required: "Name is required",
      minLength: {
        value: 6,
        message: "Name must have at least 6 characters"
      }
    },
    email: {
      required: "Email is required"
    },
    password: {
      required: "Password is required",
      pattern: {
        value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
        message: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
      }
    }
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <div className="form-control">
          <label>Name</label>
          <input type='text' name="name" {...register('name', registerOptions.name)} />
          {errors?.name && (
            <span className='error-span'>{errors.name.message}</span>
          )}
        </div>
        <div className="form-control">
          <label>Email</label>
          <input type='email' name="email" {...register('email', registerOptions.email)} />
          {errors?.email && (
            <span className='error-span'>{errors.email.message}</span>
          )}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type='password' name="password" {...register('password', registerOptions.password)} />
          {errors?.password && (
            <span className='error-span'>{errors.password.message}</span>
          )}
        </div>
        <div className="form-control">
          <label>Confirm Password</label>
          <input type='password' name="confirmPassword" {...register('confirmPassword', { validate: (value) => {
            return value === getValues().password || "Passwords do not match"
          } })} />
          {errors?.confirmPassword && (
            <span className='error-span'>{errors.confirmPassword.message}</span>
          )}
        </div>
        <div className="form-control">
          <button type='submit'>Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default App
