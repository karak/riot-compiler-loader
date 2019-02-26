const loader = require("./");

const MY_BUTTON_TAG = `
<my-button>
  <button style={{color: props.color}}>Push me!</button>
</my-button>
`;

function kickLoader(tag, callback) {
  loader.apply({ callback }, [tag]);
}

it("generates code and map", done => {

  kickLoader(MY_BUTTON_TAG, (error, code, map, meta) => {
    expect(error).toBeNull();
    expect(code).not.toBeNull();
    expect(map).not.toBeNull();
    expect(meta).toBeUndefined();
    done();
  });
});

