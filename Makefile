NAME = "Lunar Calendar \u519c\u5386"
UUID = "lunarcal@ailin.nemui"

install: msgfmt
	glib-compile-schemas schemas/
	rsync -rltvp --exclude='.git' --exclude='.vscode' . ~/.local/share/gnome-shell/extensions/$(UUID)

uninstall:
	gnome-extensions uninstall $(UUID)

#	export SHELL_DEBUG=all; \
#	export G_MESSAGES_DEBUG=all; \
#	export MUTTER_DEBUG_DUMMY_MODE_SPECS=1366x768; \

run:
	set -e; \
	\
	dbus-run-session -- gnome-shell --nested --wayland

msgunfmt:
	set -e; \
	for f in $$(find . -name "*.mo"); do \
		echo $f; \
		msgunfmt $$f > $${f%.mo}.po; \
	done

msgfmt:
	set -e; \
	for f in $$(find . -name "*.po"); do \
		echo $f; \
		msgfmt $$f > $${f%.po}.mo; \
	done

.ONESHELL:
gjs:
	set -e; \
	oldir=$$HOME/.local/share/gnome-shell/gnome-shell-overlay; \
	mkdir -p $$oldir; \
	for lib in /usr/lib/x86_64-linux-gnu/libgjs.so.0 /usr/lib/gnome-shell/libshell-14.so; do \
		for f in $$(gresource list $$lib); do \
			mkdir -p $$(dirname $$oldir/$${f#/org/gnome/}); \
			gresource extract $$lib $$f > $$oldir/$${f#/org/gnome/}; \
		done \
	done; \
	grep -E -o -q "^[^#]+G_RESOURCE_OVERLAYS" $$HOME/.profile || \
	cat <<EOF >>$$HOME/.profile
	export G_RESOURCE_OVERLAYS="/org/gnome=$$HOME/.local/share/gnome-shell/gnome-shell-overlay"
