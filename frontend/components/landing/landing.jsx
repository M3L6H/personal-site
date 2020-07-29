import React from 'react';
import Anime from 'react-anime';

import { Container, Header } from 'semantic-ui-react';

import Title from './title';

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

const name = {
  ...firstLine,
  delay: (_, i) => i * delay + firstLineDelay
};
const nameDelay = name.delay(null, nameWords.length - 1) + 2 * pause;

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
  return (
    <section className="landing">
      <Container text>
        <Header as="h2">
          <Anime { ...firstLine }>
            { renderWords(firstWords) }
          </Anime>
        </Header>
        <Header as="h2" className="primary">
          <Anime { ...name }>
            { renderWords(nameWords) }
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
