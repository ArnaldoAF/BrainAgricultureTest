import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import SimpleCard from '../../components/Dashboard/SimpleCard';
import GraficoPizza from '../../components/Dashboard/GraficoPizza';
import { useSelector, useDispatch } from 'react-redux'

const Dashboard = () => {
    const listaFarm = useSelector((state) => state.farmlist.list);
    const somaArea = listaFarm?.map(x => x.totalArea).reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a), 0)

    const listaEstados = [...new Set(listaFarm?.map(x => x.state))];
    let listaEstadosValores = [];
    listaEstados.forEach(estado => {
        listaEstadosValores.push(listaFarm.filter(x => x.state === estado).length)
    }
    )
    let dataEstado = {
        labels: listaEstados,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: 'rgb(255, 99, 132)',
            data: listaEstadosValores,
        }]

    }

    const totalAreaAgr = listaFarm?.map(x => x.agrArea).reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a), 0);
    const totalAreaVeg = listaFarm?.map(x => x.vegArea).reduce((partialSum, a) => parseFloat(partialSum) + parseFloat(a), 0);
    
    
    let dataArea = {
        labels: ["Area Vegetação", "Area Agriculturavel"],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: 'rgb(255, 99, 132)',
            data: [totalAreaAgr, totalAreaVeg],
        }]

    }

    const listaCulturas = listaFarm?.map(x=>x.cultureList.map(y=>y.name)).flat();
    const listaCulturasSemRepeticao = [...new Set(listaCulturas)];
    let listaCulturasValores = [];
    listaCulturasSemRepeticao.forEach(cultura => {
        listaCulturasValores.push(listaCulturas.filter(x => x === cultura).length)
    }
        )
    let dataCultura = {
        labels: listaCulturasSemRepeticao,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
            borderColor: 'rgb(255, 99, 132)',
            data: listaCulturasValores,
          }]

    }
    return (
        <div>
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(3, 1fr)'
                }}>
                <SimpleCard
                    name="qtd de fazendas"
                    value={listaFarm.length}
                ></SimpleCard>
                <SimpleCard
                    name="area total de fazendas"
                    value={somaArea}
                ></SimpleCard>
                <GraficoPizza data={dataEstado} titulo="Distribuição por Estado"></GraficoPizza>
                <GraficoPizza data={dataCultura} titulo="Distribuição por Cultura"></GraficoPizza>
                <GraficoPizza data={dataArea} titulo="Distribuição por Area"></GraficoPizza>


            </Box>

        </div>
    );
}


export default Dashboard;