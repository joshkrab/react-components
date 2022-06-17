// hot keys rce
import React, { Component } from 'react';

export class ClassCounter extends Component {
   constructor(props) {
      super(props);
      // Для стану в Component є властивість .state
      this.state = {
         count: 0,
      };
      // При визові функції контекст губиться, тому вказуємо його в bind:
      this.increment = this.increment.bind(this);
      this.decrement = this.decrement.bind(this);
   }
   // Так як ми в класі слово function видалили:
   increment() {
      this.setState({ count: this.state.count + 1 });
   }
   decrement() {
      this.setState({ count: this.state.count - 1 });
   }

   // В классі функція  render() поверне нам jsx код:
   render() {
      return (
         <div>
            <h1>{this.state.count}</h1>
            <button onClick={this.increment}>Increment</button>
            <button onClick={this.decrement}>Decrement</button>
         </div>
      );
   }
}

export default ClassCounter;
