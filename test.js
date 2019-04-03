"use strict";
const loader = require("./");
const evalModule = require("./test-helpers/eval-module");

const MY_BUTTON_TAG = `
<my-button>
  <button style={{color: props.color}}>Push me!</button>
</my-button>
`;

const COMPONENT_TAG = `
<component>
  <span>template</span>
  <style>
  span {
    color: red;
  }
  </style>
  <script>
  export default {
    foo() {
      return "foo";
    }
  }
  </script>
</component>
`

const SCOPED_TAG = `
<x-button>
  <span></span>
  <style>
  :host { color: red }
  </style>
</x-button>
`

function kickLoader(tag, options, callback) {
  if (arguments.length < 3) {
    callback = options;
    options = {};
  }

  const query = Object.entries(options).reduce(
    (accum, [key, value]) => `${accum}&${key}=${value}`,
    "?"
  );

  loader.apply({ callback, query }, [tag]);
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


it("generates code with specified structure", done => {
  kickLoader(COMPONENT_TAG, (_, code) => {
    const tagImpl = evalModule(code);
    console.log(tagImpl);
    expect(tagImpl.name).toBe("component");
    expect(tagImpl.css.trim()).toBe(`component span,[is="component"] span{\n    color: red;\n  }`);
    expect(tagImpl.template).toBeDefined();
    expect(tagImpl.exports).toBeDefined();
    expect(tagImpl.exports.foo()).toBe("foo");
    done();
  });
});


it("disables Scoped CSS by Option", done => {
  kickLoader(SCOPED_TAG, { scopedCss: false }, (_, code) => {
    const tagImpl = evalModule(code);
    expect(tagImpl.css.trim()).toBe(`:host { color: red }`);
    done();
  });
});
