export function HelperTexts({ error, errorMessage, counter, isDirty, description }) {
  function foo() {
    let message = ''
    if ((isDirty || description) === false) {
      message = ''
    }
    if (isDirty === true && description && error === false) {
      message = description
    }
    if (isDirty === false) {
      message = description
    }
    if (isDirty === true && error === true) {
      message = errorMessage
    }
    return message
  }

  const currentMessage = foo()

  const helperTexts = [
    {
      id: 1,
      value: currentMessage,
    },
    {
      id: 2,
      value: counter,
    },
  ]

  return helperTexts.map((text) => (
    <span
      key={text.id}
      data-id={text.id}
      style={{
        color: text.id === 2 ? 'rgba(0, 0, 0, 0.6)' : '',
        textAlign: text.id === 2 ? 'right' : '',
      }}
      className="helper-text"
    >
      {text.value}
    </span>
  ))
}
