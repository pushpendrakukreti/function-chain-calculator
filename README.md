# Function Chain Calculator

This project is a **Function Chain Calculator** built using **React** with **TypeScript** and styled with **TailwindCSS**. It allows users to input a value for `x`, which is processed through a series of functions. Each function modifies the value and passes the result to the next function in the chain, with the final result displayed to the user.

## Features

- **React + TypeScript**: Provides a strongly-typed, component-based structure for building the UI.
- **TailwindCSS**: Enables efficient and responsive styling.
- **Chain of Functions**: Each function takes the result of the previous function, processes it, and passes it down the chain.
- **Real-time Calculations**: The output updates instantly when the input or any function changes.

## Demo Example

The following example demonstrates the function chain process:

1. \( y_1 = x \times 2 \)
2. \( y_2 = 2 \times y_1 + 4 \)
3. \( y_3 = y_2^2 \)
4. \( y_4 = \frac{y_3}{2} \)

Where `x` is the initial input provided by the user.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Contributing](#contributing)

## Installation

Follow the steps below to set up the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/pushpendrakukreti/function-chain-calculator.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd function-chain-calculator
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Install and configure TailwindCSS**:

   ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init
   ```

5. **Configure tailwind.config.js**:

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

6. **Add Tailwind imports to index.css**:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

7. **Run the development server**:

   ```bash
    npm start
   ```

The app will be available at http://localhost:3000.

## Usage

1. Input a value for `x` in the provided field.
2. The series of functions will be applied to the input, and the final result will be displayed.
3. You can modify the functions in `FunctionCard` components to explore different calculations.

## Project Structure

```bash
 src/
├── components/
│   ├── FunctionCard.tsx     # Displays each function in the chain
│   ├── FunctionChain.tsx    # Manages the flow of functions
│   ├── InputCard.tsx        # Captures user input for x
│   └── FinalOutput.tsx      # Displays the final calculated result
├── App.tsx                  # Main app component that renders the FunctionChain
├── index.css                # TailwindCSS styles
└── index.tsx                # Entry point of the application
```

## Components

### `FunctionCard.tsx`

- Represents a single function in the chain.
- Receives the input, applies a calculation, and passes the result to the next function.

### `InputCard.tsx`

- A form field component that takes user input for `x`.
- The entered value propagates through the function chain in real time.

### `FinalOutput.tsx`

- Displays the final computed output after all functions have processed the input value.

### `FunctionChain.tsx`

- Chains together multiple `FunctionCard` components.
- Handles the logic for sequentially passing the result between the functions.

## Contributing

Contributions are welcome! If you’d like to contribute, please follow the steps below:

1. **Fork the repository.**
2. **Create a new branch**:
   ```bash
   git checkout -b feature-name
   ```
3. **Make your changes.**
4. **Commit the changes**:
   ```bash
    git commit -m 'Add feature'
   ```
5. **Push to the branch**:
   ```bash
    git push origin feature-name
   ```
6. **Open a Pull Request.**
