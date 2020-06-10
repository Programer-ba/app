export default function(view, amplifier=1) {
    switch(view){
        case 'simple':
            return {
                width: 16,
                ar: '1:1'
            }

        case 'grid':
        case 'masonry':
            return {
                width: 194 + (amplifier * 30),
                ar: view == 'grid' ? '16:9' : undefined
            }

        default:
            return {
                width: 56,
                ar: '7:6'
            }
    }
}