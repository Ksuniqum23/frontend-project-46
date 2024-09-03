import gendiff from "../index.js";

test('test genDiff', () => {

    const response = gendiff('__fixtures__/Alice.json', '__fixtures__/Bob.json');

    expect(response).toBe('{\n' +
        '  - age: 30\n' +
        '  + age: 25\n' +
        '  - name: Alice\n' +
        '  + name: Bob\n' +
        '}');
})