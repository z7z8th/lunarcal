NAME = "Lunar Calendar \u519c\u5386"
UUID = "lunarcal@ailin.nemui"

install:
	rsync -rltvp . ~/.local/share/gnome-shell/extensions/$(UUID)

#	export SHELL_DEBUG=all; \
#	export G_MESSAGES_DEBUG=all; \
#	export MUTTER_DEBUG_DUMMY_MODE_SPECS=1366x768; \

run:
	set -e; \
	\
	dbus-run-session -- gnome-shell --nested --wayland
