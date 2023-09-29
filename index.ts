#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import { type } from 'os';

let playerName: string;
let firstNumber: string;
let secondNumber: string;
let operator: string;
let result: number;


const sleep = async (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    'Who Wants to use command line calculator based on typescript? \n'
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO USE')} 
    calculator is a versatile tool that 
    simplifies numerical calculations ${chalk.bgRed('fast')}
    from finance and engineering to education and science....

  `);
}

async function handleAnswer(input: string, type: string) {
  const spinner = createSpinner('wait...').start();
  await sleep();

  if (input !== "") {
    if (type == "firstNumber") {
      firstNumber = input
    } else if (type == "secondNumber") {
      secondNumber = input
    } else if (type == "operator") {
      console.log("chala")
      operator = input
    }
    spinner.success({ text: `Thanks to give inputs ${playerName}.` });
  } else {
    spinner.error({ text: `💀💀💀 kindly enter a non empty value ${playerName}!` });
    process.exit(1);
  }


}

async function askName() {
  const answers: { player_name: string } = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'By the way What is your name?',
    default: 'Player',
  });

  playerName = answers.player_name;
}

function winner() {
  console.clear();
  figlet(`Your Answer Is  , ${ result} !\n `, (err, data) => {
    console.log(gradient.pastel.multiline(data) + '\n');

    console.log(
      chalk.green(
        `BY KANWAR SIKANDAR ALI`
      )
    );
    process.exit(0);
  });
}

async function handleInput1() {
  const answers: { firstNumber: string } = await inquirer.prompt({
    name: 'firstNumber',
    type: 'input',
    message: 'Input your first number  \n',

  });
  return handleAnswer(answers.firstNumber, "firstNumber");

}

async function handleInput2() {
  const answers: { secondNumber: string } = await inquirer.prompt({
    name: 'secondNumber',
    type: 'input',
    message: 'Input your second number  \n',

  });

  return handleAnswer(answers.secondNumber, "secondNumber");

}

async function handleOperator() {
  const answers: { operator: string } = await inquirer.prompt({
    name: 'operator',
    type: 'list',
    message: 'what function do you want to perform  \n',
    choices: ['Addition', 'Subraction', 'Multiplication', 'Division'],

  });

  return handleAnswer(answers.operator, "operator");

}


async function handleResult() {
  switch (operator) {
    case 'Addition':
      result = Number(firstNumber) + Number(secondNumber);
      break;
    case 'Subraction':
      result = Number(firstNumber) - Number(secondNumber);
      break;
    case 'Multiplication':
      result = Number(firstNumber) * Number(secondNumber);
      break;
    case 'Division':
      result = Number(firstNumber) / Number(secondNumber);
      break;
  }

  console.log("result", result)
}


// Run it with top-level await
console.clear();

async function startQuiz() {
  await welcome();
  await askName();
  await handleInput1();
  await handleInput2();
  await handleOperator()
  await handleResult()
  winner();
}
startQuiz();

