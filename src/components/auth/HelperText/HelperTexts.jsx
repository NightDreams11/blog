export function HelperTexts({ error, errorMessage, counter, isDirty, description }) {
  function foo() {
    let message = ''
    if (!(isDirty || description)) {
      message = ''
    }
    if (isDirty && description && !error) {
      message = description
    }
    if (!isDirty) {
      message = description
    }
    if (isDirty && error) {
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
