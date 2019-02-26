const loader = require("./");

const MY_BUTTON_TAG = `
<my-button>
  <button style={{color: props.color}}>Push me!</button>
</my-button>
`;

it("generates code and map", () => {
  const { code, map, meta } = loader(MY_BUTTON_TAG);

  expect(code).not.toBeNull();
  expect(map).not.toBeNull();
  expect(meta).toBeUndefined();
});

