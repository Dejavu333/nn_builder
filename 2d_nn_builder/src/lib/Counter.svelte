<!-- This code is a Svelte component that displays a button with the text "count is" followed by the current value of a 
variable called "count". The "count" variable is initialized to 0 and is incremented by 1 every time the button is 
clicked, thanks to the on:click event that calls the increment() function.

In Svelte, the script section is used to declare variables, functions, and other logic that is used in the component.
The variable 'count' is declared and initialized to 0. The function increment() is declared and increments the value 
of the count variable by 1.

In the JSX like syntax, the button is rendered. The on:click is used to bind the click event to the increment function.
The button text shows the current count using the curly braces {} that allow to insert javascript expressions. -->

<!--! A component made of script, generated HTML, and style part. -->

<!-- script part is used to declare variables, functions, and other logic that is used in the component. -->
<script>
  let count = 0
  function increment() {
    count += 1
  }
</script>

<!-- generated HTML part -->
<button on:click={increment}>
  count is {count}
</button>

<!-- style part -->
<style>
  button {
    color: red;
  }
</style>