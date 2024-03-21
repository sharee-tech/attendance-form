import Button from "./Button";
import ResponsiveDatePickers from "./ResponsiveDatePickers";

export default function Form() {
  return (
    <form>
      <h1>Choir Attendance</h1>
      <h2>Indicate which days you will be absent:</h2>
      <input type="text" placeholder="Date..." />
      <ResponsiveDatePickers />
      <Button />
    </form>
  );
}
