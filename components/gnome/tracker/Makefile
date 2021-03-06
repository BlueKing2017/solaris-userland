#
# CDDL HEADER START
#
# The contents of this file are subject to the terms of the
# Common Development and Distribution License (the "License").
# You may not use this file except in compliance with the License.
#
# You can obtain a copy of the license at usr/src/OPENSOLARIS.LICENSE
# or http://www.opensolaris.org/os/licensing.
# See the License for the specific language governing permissions
# and limitations under the License.
#
# When distributing Covered Code, include this CDDL HEADER in each
# file and include the License file at usr/src/OPENSOLARIS.LICENSE.
# If applicable, add the following below this CDDL HEADER, with the
# fields enclosed by brackets "[]" replaced with your own identifying
# information: Portions Copyright [yyyy] [name of copyright owner]
#
# CDDL HEADER END
#

#
# Copyright (c) 2015, 2020, Oracle and/or its affiliates. 
#

BUILD_BITS=		64
# All components using gobject-introspection must be built with gcc as
# gobject-introspection does not produce correct results when using Studio.
COMPILER=		gcc
include ../../../make-rules/shared-macros.mk

COMPONENT_NAME=		tracker
COMPONENT_VERSION=	2.3.2
COMPONENT_ARCHIVE_HASH= \
	sha256:a4782b8ec7e4ee50f8f53865b24c5489823337fa94f785a7d9d34ccdf9b6ebdb
COMPONENT_BUGDB=        gnome/libraries
COMPONENT_ANITYA_ID=	5578

TPNO=			56951
BUILD_STYLE=            meson

# Disable the unit tests since the test results are outdated.
$(SKIP_TEST_AT_TOP_LEVEL)

include $(WS_MAKE_RULES)/gnome-component.mk

CFLAGS += $(XPG6MODE)

CONFIGURE_ENV += PATH="$(GNUBIN):$(PATH)"
COMPONENT_INSTALL_ENV += PATH="$(GNUBIN):$(PATH)"
COMPONENT_BUILD_ENV += PATH="$(GNUBIN):$(PATH)"

CONFIGURE_OPTIONS += -Dnetwork_manager=disabled
CONFIGURE_OPTIONS += -Dstemmer=disabled
CONFIGURE_OPTIONS += -Dsystemd_user_services=no
CONFIGURE_OPTIONS += --libexecdir=$(USRLIBDIR)
LDFLAGS += -z gnu-version-script-compat

# Add tests
COMPONENT_TEST_TRANSFORMS += '-e "s/      [0-9].[0-9][0-9] s//" '
COMPONENT_TEST_TRANSFORMS += \
        '-n ' \
        '-e "/Ok:/p" ' \
        '-e "/Pass:/p" ' \
        '-e "/Fail:/p" '
COMPONENT_TEST_MASTER = $(COMPONENT_TEST_RESULTS_DIR)/results-all.master

REQUIRED_PACKAGES += codec/flac
REQUIRED_PACKAGES += codec/libvorbis
REQUIRED_PACKAGES += database/sqlite-3
REQUIRED_PACKAGES += desktop/pdf-viewer/poppler-viewer
REQUIRED_PACKAGES += gnome/file-manager/nautilus
REQUIRED_PACKAGES += image/library/libexif
REQUIRED_PACKAGES += image/library/libjpeg
REQUIRED_PACKAGES += image/library/libpng16
REQUIRED_PACKAGES += image/library/libtiff
REQUIRED_PACKAGES += library/audio/taglib
REQUIRED_PACKAGES += library/desktop/atk
REQUIRED_PACKAGES += library/desktop/gdk-pixbuf
REQUIRED_PACKAGES += library/desktop/gstreamer-1
REQUIRED_PACKAGES += library/desktop/gstreamer-1/gst-plugins-base
REQUIRED_PACKAGES += library/desktop/gtk3
REQUIRED_PACKAGES += library/desktop/libgsf
REQUIRED_PACKAGES += library/desktop/libgxps
REQUIRED_PACKAGES += library/exempi
REQUIRED_PACKAGES += library/glib2
REQUIRED_PACKAGES += library/icu
REQUIRED_PACKAGES += library/json-glib
REQUIRED_PACKAGES += library/libsoup
REQUIRED_PACKAGES += library/libxml2
REQUIRED_PACKAGES += library/media-player/totem-pl-parser
REQUIRED_PACKAGES += print/filter/poppler
REQUIRED_PACKAGES += system/hal
REQUIRED_PACKAGES += system/library/libc
REQUIRED_PACKAGES += system/library/libdbus
REQUIRED_PACKAGES += system/library/libdbus-glib
REQUIRED_PACKAGES += system/library/math
