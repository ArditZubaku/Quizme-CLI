# QuizMe

## A CLI tool that will help to test knowledge

This script will make the app globally executable in UNIX systems

```bash
chmod +x ./makexec.sh
```

```sh
quizme
```

- Ask a question
- Evaluate answer or have me self-evaluate
- Log the results

```sh
quizme --add
```

or shorthand

```sh
quizme -a
```

- Start a dialogue
- Ask me for a question
- Ask me for the answer
- Store for future uses

## What does it do?

- Parse arguments
- Interactive command line
- Persist my data - using JSON
  - Reading/Writing from the file system
- Global script
- Self-evaluating or auto-evaluating
