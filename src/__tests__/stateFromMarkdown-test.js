/* @flow */
const {describe, it} = global;
import expect from 'expect';
import stateFromMarkdown from '../stateFromMarkdown';
import {convertToRaw} from 'draft-js';

describe('stateFromMarkdown', () => {
  it('should create content state', () => {
    let markdown = 'Hello World';
    let contentState = stateFromMarkdown(markdown);
    let rawContentState = convertToRaw(contentState);
    let blocks = removeKeys(rawContentState.blocks);
    expect(blocks).toEqual(
      [{text: 'Hello World', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: []}]
    );
  });

  it('should create content state with two blocks for two spaces & newline', () => {
    const markdown = 'Hello  \nWorld';
    const contentState = stateFromMarkdown(markdown);
    const rawContentState = convertToRaw(contentState);
    const blocks = removeKeys(rawContentState.blocks);
    expect(blocks).toEqual(
      [
        {text: 'Hello', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: []},
        {text: 'World', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: []},
      ]
    );
  });
});

function removeKeys(blocks) {
  return blocks.map((block) => {
    let {key, ...other} = block; // eslint-disable-line no-unused-vars
    return other;
  });
}
