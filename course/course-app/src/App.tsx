import './App.css';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

type HeaderProp = {
  name: string;
}

const Header = (props: HeaderProp) => <h1>{props.name}</h1>;

type ContentProps = {
  courseParts: CoursePart[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CoursePart }) => {
  switch(course.kind) {
    case "basic":
      return (
        <>
          <h4>{course.name} {course.exerciseCount}</h4>
          <p><i>{course.description}</i></p>
        </>
    )
    case "group":
      return (
        <>
          <h4>{course.name} {course.exerciseCount}</h4> 
          <p>project excercises {course.groupProjectCount}</p>
        </>
      )
    case "background":
      return (
        <>
          <h4>{course.name} {course.exerciseCount}</h4>
          <i>{course.description}</i>
          <p>submit to {course.backgroundMaterial}</p>
        </>
      )
    case "special":
      return (
        <>
          <h4>{course.name} {course.exerciseCount}</h4>
          <i>{course.description}</i>
          <p>required skills: {course.requirements.join(", ")}</p>
        </>
      )
    default:
      return assertNever(course)
  }
}

const Content = ({courseParts}: ContentProps) => {
  return (
    <div>
      {courseParts.map(course => <Part key={course.name} course={course}/>)}
    </div>
  )
};

const Total = (props: ContentProps) => {
  const total = props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
};

export default App;