import prisma from "../src/db/prisma ";

async function main(){

    await prisma.terms.upsert({
        where: {id:1},
        update:{},
        create:{number: 1}
    });

    await prisma.terms.upsert({
        where: {id:2},
        update:{},
        create:{number: 2}
    });

    await prisma.terms.upsert({
        where: {id:3},
        update:{},
        create:{number: 3}
    });

    await prisma.terms.upsert({
        where: {id:4},
        update:{},
        create:{number: 4}
    });

    await prisma.terms.upsert({
        where: {id:5},
        update:{},
        create:{number: 5}
    });

    await prisma.terms.upsert({
        where: {id:6},
        update:{},
        create:{number: 6}
    });
    
    await prisma.categories.upsert({
        where:{id:1},
        update:{},
        create:{name:"Projeto"}
    });

    await prisma.categories.upsert({
        where:{id:2},
        update:{},
        create:{name:"Prática"}
    });

    await prisma.categories.upsert({
        where:{id:3},
        update:{},
        create:{name:"Recuperação"}
    });

    await prisma.teachers.upsert({
        where:{id:1},
        update:{},
        create:{name:"Diego Pinho"}
    });

    await prisma.teachers.upsert({
        where:{id:2},
        update:{},
        create:{name:"Bruna Hamori"}
    });

    await prisma.disciplines.upsert({
        where:{id:1},
        update:{},
        create:{name:"HTML e CSS", termId:1}
    });

    await prisma.disciplines.upsert({
        where:{id:2},
        update:{},
        create:{name:"Javascript", termId:2}
    });

    await prisma.disciplines.upsert({
        where:{id:3},
        update:{},
        create:{name:"React", termId:3}
    });

    await prisma.disciplines.upsert({
        where:{id:4},
        update:{},
        create:{name:"Humildade", termId:1}
    });

    await prisma.disciplines.upsert({
        where:{id:5},
        update:{},
        create:{name:"Planejamento", termId:2}
    });

    await prisma.disciplines.upsert({
        where:{id:6},
        update:{},
        create:{name:"Autoconfiança", termId:3}
    });

    await prisma.teachersDisciplines.upsert({
        where:{id:1},
        update:{},
        create:{teacherId:1, disciplineId:1}
    });

    await prisma.teachersDisciplines.upsert({
        where:{id:2},
        update:{},
        create:{teacherId:1, disciplineId:2}
    });

    await prisma.teachersDisciplines.upsert({
        where:{id:3},
        update:{},
        create:{teacherId:1, disciplineId:3}
    });

    await prisma.teachersDisciplines.upsert({
        where:{id:4},
        update:{},
        create:{teacherId:2, disciplineId:4}
    });

    await prisma.teachersDisciplines.upsert({
        where:{id:5},
        update:{},
        create:{teacherId:2, disciplineId:5}
    });

    await prisma.teachersDisciplines.upsert({
        where:{id:6},
        update:{},
        create:{teacherId:2, disciplineId:6}
    });

}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => {
    prisma.$disconnect();
});
