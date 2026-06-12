export function findMatchingGadgets(parsedPolicy, gadgets) {

    const matches = [];

    const sources = [];

    for (const values of Object.values(parsedPolicy)) {

        values.forEach(value => {

            if (
                value.includes(".") &&
                !value.startsWith("'")
            ) {
                sources.push(value);
            }

        });

    }

    sources.forEach(source => {

        const found = gadgets.filter(gadget =>
            gadget.domain.includes(source) ||
            source.includes(gadget.domain)
        );

        matches.push(...found);

    });

    return matches;
}
