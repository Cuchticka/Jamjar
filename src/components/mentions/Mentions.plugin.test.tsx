import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Mentions from './Mentions';
import { Plugin } from '@tiptap/pm/state';
import { DecorationSet } from '@tiptap/pm/view';

describe('Mentions extension decorations', () => {
  it('creates decorations for mention links', () => {
    const editor = new Editor({
      extensions: [StarterKit, Mentions],
      content: '<p>Check this user: https://d2jam.com/u/username</p>',
    });

    const plugin = editor.view.state.plugins.find(
      (p): p is Plugin => !!(p as Plugin).props?.decorations
    );
    expect(plugin).toBeTruthy();

    const decorations = (plugin!.props.decorations as (state: any) => DecorationSet)(editor.view.state);

    expect(decorations).toBeInstanceOf(DecorationSet);
    expect(decorations.find()).not.toHaveLength(0);

    const mentionElement = editor.view.dom.querySelector('.mention');
    expect(mentionElement).not.toBeNull();
  });

  it('does not create decorations for non-mention links', () => {
    const editor = new Editor({
      extensions: [StarterKit, Mentions],
      content: '<p>Check this link: https://example.com/x/otheruser</p>',
    });

    const plugin = editor.view.state.plugins.find(
      (p): p is Plugin => !!(p as Plugin).props?.decorations
    );
    expect(plugin).toBeTruthy();

    const decorations = (plugin!.props.decorations as (state: any) => DecorationSet)(editor.view.state);

    
    expect(decorations).toBeInstanceOf(DecorationSet);
    expect(decorations.find()).toHaveLength(0);

    const mentionElement = editor.view.dom.querySelector('.mention');
    expect(mentionElement).toBeNull();
  });
});