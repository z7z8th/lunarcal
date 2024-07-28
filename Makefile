NAME = "Lunar Calendar \u519c\u5386"
UUID = "lunarcal@ailin.nemui"

install: msgfmt
	glib-compile-schemas schemas/
	rsync -rltvp --exclude='.git' --exclude='.vscode' . ~/.local/share/gnome-shell/extensions/$(UUID)

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
