import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';

const buttonWidth = Dimensions.get("window").width / 5

export default function App() {
  const [answerValue, setAnswerValue] = useState(0)
  const [readyToreplace, setReadyToReplace] = useState(true)
  const [memoryValue, setMemoryValue] = useState()
  const [operatorValue, setOperatorValue] = useState(0)

  function buttonPressed(val) {

    if (typeof val === "number") {
      setAnswerValue(handleNumber(val))
    }
    if (val === 'C') {
      setAnswerValue(0)
      setMemoryValue(0)
      setOperatorValue(0)
      setReadyToReplace(true)
    }
    if (val == '+' | val == '-' | val == 'x' | val == '/') {
      if (operatorValue != 0) {
        let num = calculateEquals()
        console.log(num)
        setMemoryValue(num)
      } else {
        setMemoryValue(answerValue)
      }
      setReadyToReplace(true)
      setOperatorValue(val)
    }
    if (val == '=') {
      calculateEquals()
      setMemoryValue(0)
      setReadyToReplace(true)
    }

    if (val == "+/-") {
      Math.sign == 1 ? setAnswerValue(-answerValue) : setAnswerValue(-answerValue)
    }
    if (val == '%') {
      setAnswerValue(answerValue * 0.01)
    }
    if (val == '.') {
      setAnswerValue(answerValue + '.')
    }
  }

  function handleNumber(val) {
    if (readyToreplace == true) {
      setReadyToReplace(false)
      return val
    }
    else {
      return Number(`${answerValue}${val}`)
    }
  }

  function calculateEquals() {
    let previous = parseFloat(memoryValue)
    let current = parseFloat(answerValue)

    switch (operatorValue) {

      case '+':
        let sum = previous + current
        setAnswerValue(sum)
        return (sum)

      case '-':
        let difference = previous - current
        setAnswerValue(difference)
        return difference;

      case 'x':
        let product = previous * current
        setAnswerValue(product)
        return product;

      case '/':
        let quotient = previous / current
        setAnswerValue(quotient)
        return quotient;

      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.resultsField}>{answerValue}</Text>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => { buttonPressed("C") }} style={[styles.buttons, { backgroundColor: '#C31736' }]}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed("+/-") }} style={styles.buttons}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed("%") }} style={styles.buttons}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed("/") }} style={[styles.buttons, styles.operations]}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => { buttonPressed(7) }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed(8) }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed(9) }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed("x") }} style={[styles.buttons, styles.operations]}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => { buttonPressed(4) }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed(5) }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed(6) }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed("-") }} style={[styles.buttons, styles.operations]}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => { buttonPressed(1) }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed(2) }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed(3) }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed("+") }} style={[styles.buttons, styles.operations]}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => { buttonPressed(0) }} style={[styles.buttons, styles.numbers, styles.longbutton]}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => { buttonPressed('.') }} style={[styles.buttons, styles.numbers]}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { buttonPressed("=") }} style={[styles.buttons, styles.operations, { backgroundColor: 'orange' }]}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="light content" />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: '#f2dfd3',
  },

  resultsField: {
    color: "black",
    fontSize: buttonWidth / 1.4,
    paddingRight: "12%",
    marginBottom: "2%",
    textAlign: "right"
  },
  row: {
    flexDirection: "row",
  },
  buttons: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8A2BE2",
    margin: "2%",
    width: buttonWidth,
    height: buttonWidth,
    borderRadius: buttonWidth / 4
  },
  buttonText: {
    color: "white",
    fontSize: buttonWidth / 2,
  },
  operations: {
    backgroundColor: "#1B3461"
  },
  numbers: {
    backgroundColor: "#008080"
  },
  longbutton: {
    width: buttonWidth * 2.2,
    alignItems: "flex-start",
    paddingLeft: buttonWidth / 2.5
  }
});
