import React from 'react';
import Anime from 'react-anime';

import { Container, Header } from 'semantic-ui-react';

import Title from './title';

import name from "images/name.svg";

const firstWords = ["Hi,", "my", "name", "is"];
const nameWords = ["Michael", "Hollingworth"];
const secondWords = ["and", "I", "am", "a"];

const delay = 200;
const pause = 400;
  
const firstLine = {
  opacity: [0, 1],
  translateY: [-125, 0],
  delay: (_, i) => i >= 1 ? i * delay + pause : 0
};
const firstLineDelay = firstLine.delay(null, firstWords.length - 1) + pause;

const nameAnim = {
  ...firstLine,
  delay: (_, i) => i * delay + firstLineDelay
};
const nameDelay = nameAnim.delay(null, nameWords.length - 1) + 2 * pause;

const secondLine = {
  ...firstLine,
  delay: (_, i) => i * delay + nameDelay
};
const secondLineDelay = secondLine.delay(null, secondWords.length - 1) + pause;

const renderWords = (words) => (
  words.map((word, key) => (
    <span className="word" key={ key }>{ word }</span>
  ))
);

export default function Landing() {
  console.log(`assets/${ name }`, "test");
  
  return (
    <section className="landing">
      <Container text>
        <Header as="h2">
          <Anime { ...firstLine }>
            { renderWords(firstWords) }
          </Anime>
        </Header>
        <Header as="h2" className="primary" className="name-header">
          <Anime { ...nameAnim }>
            <img src={ `assets/${ name }` } alt="Michael Hollingworth" className="name-svg" />
          </Anime>
        </Header>
        <Header as="h2">
          <Anime { ...secondLine }>
            { renderWords(secondWords) }
          </Anime>
        </Header>
        <Title delay={ secondLineDelay } />
      </Container>
    </section>
  );
}
