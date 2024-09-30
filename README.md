# Disable Thunderbird Quick Filter launching global search

In recent (as of writing 128.x) versions of thunderbird, pressing enter/return in the quick filter text field to commit the typing causes an unexpected global search to appear.

The thunderbird developers consider this expected/desired behaviour and didn't want to add an option for it, though I disagree that find-as-you-type filters very commonly have enter/return as a way to 'immediately' commit a search, since inevitably such filters need to have a short timeout to not be constantly churning while the user is actively typing.

# Implementation

This extension monkey-patches the quick filter commit to disable this behaviour. By default it only does this when there's an "upsell" popup for no results to ask you to press enter again, which will not trigger for an immediate return. There's an option to disable this global search behaviour entirely which is my preference.

Note this is not likely to be stable and will probably break in future thunderbird versions. YMMV.

# Installation

zip the contents of this folder into QuickFilterNoSearch.xpi (don't add any folders into the zip, make sure all the files are in the root of it) and install locally from there.

Since I only made this for myself, I'm not going to sign/publish this to any addons website.

**It also requests a ludicrous amount of permissions because I didn't know which ones would be needed for the monkey patching. Don't install this unless you know what you're doing and you trust the code.**

# License / Support

This is a 'scratch my own itch' extension, I have no interest in supporting it beyond that. It's MIT licensed so feel free to take it and modify it if you wish but don't expect issues or PRs to get any replies.
