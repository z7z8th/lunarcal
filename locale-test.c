#include <locale.h>
#include <stdio.h>
#include <libintl.h>

int main() {
    printf("LC_ALL_MASK %d\n", LC_ALL_MASK);
    printf("en %s\n", dgettext("lunar-date", "Rùn"));
    // locale_t nl = newlocale(LC_ALL_MASK, "zh_CN.UTF-8", 0);
    locale_t nl = newlocale(LC_ALL_MASK, "zh_CN.UTF-8", 0);
    printf("nl %p\n", nl);
    locale_t ol = uselocale(nl);

    printf("cn %s\n", dgettext("lunar-date", "Rùn"));
    uselocale(ol);

    freelocale(nl);
}
