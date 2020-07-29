import React, { Component } from 'react';
import Anime from 'react-anime';

import { Header } from 'semantic-ui-react';

const titles = [
  "Software Engineer",
  "Leader",
  "Game Developer",
  "Artist",
  "Full-stack Engineer",
  "Writer",
  "App Developer",
  "Ideator"
];

const titleAnim = {
  opacity: [0, 1],
  translateY: [30, 0]
};

export default class Title extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      title: -1
    };

    this.cycleTitle = this.cycleTitle.bind(this);
  }

  componentDidMount() {
    setTimeout(() => { 
      this.setState({ title: 0 });
      setInterval(this.cycleTitle, 1000); 
    }, this.props.delay);
  }
  
  componentWillUnmount() {
    clearInterval(this.cycleTitle);
  }

  cycleTitle() {
    this.setState({ title: (this.state.title + 1) % titles.length });
  }
  
  render() {
    const { title } = this.state;

    if (title === -1) {
      return (
        <Header as="h2">&#8203;</Header>
      );
    }
    
    return (
      <Header as="h2" className="primary">
        <Anime { ...titleAnim }>
          <span id="title">{ titles[title] }</span>
        </Anime>
      </Header>
    );
  }
}
