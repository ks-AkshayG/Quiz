import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Category } from "../constants/Categories";
import { Difficulty } from "../constants/Difficulties";
import { Type } from "../constants/Types";
import MantineTextInputField from "../utility/MantineTextInputField";
import MantineSelectField from "../utility/MantineSelectField";
import MantineButton from "../utility/MantineButton";

const fields = {
  name: 'Name',
  noOfQue: 'Number of Questions',
  category: 'Category',
  difficulty: 'Difficulty',
  type: 'Type',
}

type FormValuesTypes = {
  name: string
  noOfQue: string
  category: string
  difficulty: string
  type: string
};

const defaultFormValues = {
  name: "",
  noOfQue: '',
  category: '',
  difficulty: '',
  type: '',
};

const schema = yup.object({
  name: yup.string().required().label(fields.name),
  noOfQue: yup.string().matches(/^\d+$/, `${fields.noOfQue} must be a valid Integer Number`).required().label(fields.noOfQue),
  category: yup.string().required().label(fields.category),
  difficulty: yup.string().required().label(fields.difficulty),
  type: yup.string().required().label(fields.type)
})

const InitialQuizDetails = () => {

  const form = useForm({
    defaultValues: defaultFormValues,
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  const { control, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = (data: FormValuesTypes) => {

    // https://opentdb.com/api.php?amount=10&category=10&difficulty=medium&type=multiple

    const QuestionURL = `https://opentdb.com/api.php?amount=${data.noOfQue}&category=${Category[data.category]}&difficulty=${Difficulty[data.difficulty]}&type=${Type[data.type]}`
    
    console.log(QuestionURL)


  }

  // console.log(Object.keys(Category))

  return (
    <div className=" h-full flex justify-center ">
      <div className="w-[50%]">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <h2 className="w-full text-center my-3 font-bold">Quiz Details</h2>

          <MantineTextInputField 
            type='text'
            label={fields.name}
            name='name'
            errorMessage={errors.name?.message}
            control={control}
          />

          <MantineTextInputField 
            type='number'
            label={fields.noOfQue}
            name='noOfQue'
            errorMessage={errors.noOfQue?.message}
            control={control}
          />

          <MantineSelectField 
            name="category"
            label={fields.category}
            errorMessage={errors.category?.message}
            control={control}
            data={Object.keys(Category)}
          />

          <MantineSelectField 
            name="difficulty"
            label={fields.difficulty}
            errorMessage={errors.difficulty?.message}
            control={control}
            data={Object.keys(Difficulty)}
          />

          <MantineSelectField 
            name="type"
            label={fields.type}
            errorMessage={errors.type?.message}
            control={control}
            data={Object.keys(Type)}
          />

          <div className="w-full flex justify-center">
            <MantineButton type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InitialQuizDetails;
